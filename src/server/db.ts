import { type Prisma, PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";

import { env } from "../env.js";

const createPrismaClient = () =>
    new PrismaClient({
        log:
            env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

type OmitPrismaClient = Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export type PrismaTransaction = OmitPrismaClient;

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
