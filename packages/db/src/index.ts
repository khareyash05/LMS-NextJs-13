import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

/* 
  globalThis provides reference to global context
  using unknown guarantees that we will implicitly state type just to avoid Typesafe errors
*/
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const prisma =
  globalForPrisma.prisma || // checks if there is already an existing instance of the PrismaClient stored in globalForPrisma.prisma. If such an instance exists, it uses that existing instance, preventing the creation of a new one. This is useful in scenarios where you want to reuse the same PrismaClient instance across multiple modules to optimize performance.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  }); // The log option is used to configure logging for the PrismaClient. In development (process.env.NODE_ENV === "development"), it logs queries, errors, and warnings (["query", "error", "warn"]). In other environments, it only logs errors (["error"]).

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;