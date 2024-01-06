import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession, type Session } from "auth";
import { prisma } from "db";


type CreateContextOptions = {
  session: Session | null;
};

// for mocking db in a testing environment 
/*
  Inner context is where you define context which doesn’t depend on the request, 
  e.g. your database connection. You can use this function for integration testing 
  or server-side helpers, where you don’t have a request object. Whatever is defined here 
  will always be available in your procedures.
*/
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

// main context
/*
  Outer context is where you define context which depends on the request, e.g. for the user's 
  session. Whatever is defined here is only available for procedures that are called via HTTP.
*/
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerSession({ req, res });
  
  return createInnerTRPCContext({
    session,
  });
};
  
const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);