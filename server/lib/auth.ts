import { PrismaClient } from "./prismaClient";
import "dotenv/config";

const prisma = new PrismaClient();

const trustedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...(process.env.TRUSTED_ORIGINS?.split(",").map((origin) => origin.replace(/['\"]/g, "").trim()).filter(Boolean) || []),
];

let authPromise: Promise<any> | null = null;

export async function getAuth() {
    if (!authPromise) {
        authPromise = (async () => {
            const [{ betterAuth }, { prismaAdapter }] = await Promise.all([
                import("better-auth"),
                import("better-auth/adapters/prisma"),
            ]);

            return betterAuth({
                database: prismaAdapter(prisma, { provider: "postgresql" }),
                emailAndPassword: {
                    enabled: true,
                },
                user: {
                    additionalFields: {
                        credits: {
                            type: "number",
                            required: true,
                            defaultValue: 50,
                        },
                        totalCreations: {
                            type: "number",
                            required: true,
                            defaultValue: 0,
                        },
                    },
                    deleteUser: { enabled: true },
                },
                trustedOrigins,
                baseURL: process.env.BETTER_AUTH_URL!,
                secret: process.env.BETTER_AUTH_SECRET!,
                advanced: {
                    cookies: {
                        sessionToken: {
                            name: "auth_session",
                            attributes: {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                                path: "/",
                            },
                        },
                    },
                },
            });
        })();
    }

    return authPromise;
}
