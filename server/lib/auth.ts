import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma";
import "dotenv/config";

const prisma = new PrismaClient();
const trustedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    ...(process.env.TRUSTED_ORIGINS?.split(',').map(o => o.replace(/['\"]/g, '').trim()).filter(Boolean) || [])
];

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        additionalFields: {
            credits: {
                type: "number",
                required: true,
                defaultValue: 50
            },
            totalCreations: {
                type: "number",
                required: true,
                defaultValue: 0
            }
        },
        deleteUser: { enabled: true }
    },
    trustedOrigins: trustedOrigins,
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
                    path: "/"
                }
            }
        }
    }
});
