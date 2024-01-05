import { initTRPC } from '@trpc/server';
const t = initTRPC.create();
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

import {prisma} from "db"