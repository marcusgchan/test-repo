import { t } from "../utils/trpc";
import { userRouter } from "./userRouter";

export const appRouter = t.router({
  test: userRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
