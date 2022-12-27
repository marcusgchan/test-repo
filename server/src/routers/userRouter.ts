import { userSchema } from "../schemas/userSchema";
import { publicProcedure, t } from "../utils/trpc";

export const userRouter = t.router({
  getUser: publicProcedure.input(userSchema).query(({ ctx, input }) => {}),
});
