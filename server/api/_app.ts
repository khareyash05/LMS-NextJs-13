import { clientRouter } from './routers/clientRouter';
import { producerRouter } from './routers/producerRouter';
import { router } from './trpc';
 
export const appRouter = router({
    client : clientRouter,
    producer : producerRouter
});
 
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;