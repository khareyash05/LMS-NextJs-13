import { appRouter } from "@repo/api";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createTRPCContext } from "@repo/api";

export default createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
});