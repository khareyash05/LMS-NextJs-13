import { consumerRouter } from "./router/consumer";
import { producerRouter } from "./router/producer";
import { createTRPCRouter } from "./trpc";


export const appRouter = createTRPCRouter({
    consumer: consumerRouter,
    producer: producerRouter,
});
  
export type AppRouter = typeof appRouter;