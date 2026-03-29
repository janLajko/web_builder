import fs from "fs";
import path from "path";

type PrismaModule = typeof import("../generated/prisma");

function resolvePrismaClientModulePath() {
    const candidates = [
        path.resolve(process.cwd(), "generated/prisma"),
        path.resolve(__dirname, "../generated/prisma"),
        path.resolve(__dirname, "../../generated/prisma"),
    ];

    const match = candidates.find((candidate) => {
        const indexJs = path.join(candidate, "index.js");
        const packageJson = path.join(candidate, "package.json");
        return fs.existsSync(indexJs) || fs.existsSync(packageJson);
    });

    if (!match) {
        throw new Error(`Prisma client not found. Tried: ${candidates.join(", ")}`);
    }

    return match;
}

const prismaModulePath = resolvePrismaClientModulePath();
const { PrismaClient } = require(prismaModulePath) as PrismaModule;

export { PrismaClient };
