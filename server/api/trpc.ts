import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import type { SignedInAuthObject,SignedOutAuthObject } from "@clerk/nextjs/api";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { prisma } from '../prisma';

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as trpcNext from '@trpc/server/adapters/next';

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
const createInnerTRPCContext = ({ auth }: AuthContext  ) => {
  return {
    auth,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  

  return createInnerTRPCContext({ auth: getAuth(opts.req) });
};
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
}); 
 
export const router = t.router;
export const publicProcedure = t.procedure;