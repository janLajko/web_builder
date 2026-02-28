import "dotenv/config";

type JsonValue = Record<string, unknown>;

const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const SESSION_COOKIE = process.env.SMOKE_COOKIE;
const POLL_TIMEOUT_MS = Number(process.env.SMOKE_POLL_TIMEOUT_MS || 180000);
const POLL_INTERVAL_MS = Number(process.env.SMOKE_POLL_INTERVAL_MS || 5000);

function ensureCookie() {
    if (!SESSION_COOKIE) {
        throw new Error("Missing SMOKE_COOKIE. Set it to your authenticated session cookie string.");
    }
}

async function requestJson<T = JsonValue>(
    path: string,
    options: RequestInit = {},
    useAuth = true
): Promise<T> {
    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    if (useAuth && SESSION_COOKIE) {
        headers.set("Cookie", SESSION_COOKIE);
    }

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    const text = await res.text();
    let data: unknown = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText} on ${path}: ${text}`);
    }

    return data as T;
}

async function waitForInitialVersion(projectId: string) {
    const started = Date.now();

    while (Date.now() - started < POLL_TIMEOUT_MS) {
        const project = await requestJson<{
            id: string;
            versions?: Array<{ id: string; code: string }>;
        }>(`/api/project/${projectId}`, { method: "GET" });

        if (project.versions && project.versions.length > 0) {
            return project;
        }

        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    throw new Error(`Timed out waiting for initial generation after ${POLL_TIMEOUT_MS}ms`);
}

async function main() {
    ensureCookie();
    let projectId = "";

    console.log(`[Smoke] Base URL: ${BASE_URL}`);
    console.log("[Smoke] Step 1/8: create project");

    const created = await requestJson<{ projectId: string }>(
        "/api/project",
        {
            method: "POST",
            body: JSON.stringify({
                initialPrompt: "Create a modern one-page SaaS landing page with hero, features, and pricing."
            })
        }
    );
    projectId = created.projectId;
    console.log(`[Smoke] Created project: ${projectId}`);

    console.log("[Smoke] Step 2/8: wait for initial generation");
    const generatedProject = await waitForInitialVersion(projectId);
    const initialVersion = generatedProject.versions![0];
    console.log(`[Smoke] Initial version: ${initialVersion.id}`);

    console.log("[Smoke] Step 3/8: revise project");
    await requestJson(
        "/api/project/revise",
        {
            method: "POST",
            body: JSON.stringify({
                projectId,
                prompt: "Make the hero heading shorter and add a testimonials section.",
                currentCode: initialVersion.code
            })
        }
    );

    const afterRevise = await requestJson<{ versions?: Array<{ id: string; code: string }> }>(
        `/api/project/${projectId}`,
        { method: "GET" }
    );
    if (!afterRevise.versions || afterRevise.versions.length < 2) {
        throw new Error("Revision did not create a new version.");
    }
    console.log(`[Smoke] Revision created. Version count: ${afterRevise.versions.length}`);

    console.log("[Smoke] Step 4/8: rollback to initial version + save");
    const rollbackTarget = await requestJson<{ code: string }>(
        `/api/project/rollback/${initialVersion.id}`,
        { method: "GET" }
    );
    await requestJson("/api/project/save", {
        method: "POST",
        body: JSON.stringify({ projectId, code: rollbackTarget.code })
    });

    console.log("[Smoke] Step 5/8: publish project");
    const published = await requestJson<{ isPublic: boolean }>(
        `/api/project/${projectId}/publish`,
        { method: "PATCH" }
    );
    if (!published.isPublic) {
        throw new Error("Publish toggle did not set project to public.");
    }

    console.log("[Smoke] Step 6/8: verify public preview endpoint");
    const previewHtml = await requestJson<string>(`/api/project/preview/${projectId}`, { method: "GET" }, false);
    if (typeof previewHtml !== "string" || !previewHtml.trim()) {
        throw new Error("Public preview returned empty response.");
    }

    console.log("[Smoke] Step 7/8: verify project appears in public feed");
    const publicProjects = await requestJson<Array<{ id: string }>>("/api/project/public", { method: "GET" }, false);
    const found = publicProjects.some((p) => p.id === projectId);
    if (!found) {
        throw new Error("Published project not found in /api/project/public.");
    }

    console.log("[Smoke] Step 8/8: cleanup project");
    await requestJson(`/api/project/delete/${projectId}`, { method: "DELETE" });

    console.log("[Smoke] Success: create -> revise -> rollback -> publish -> public view flow passed.");
}

main().catch(async (error: unknown) => {
    console.error("[Smoke] Failed:", error);
    process.exit(1);
});
