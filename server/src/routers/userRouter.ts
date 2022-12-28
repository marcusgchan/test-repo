import { TRPCError } from "@trpc/server";
import { loginSchema, registerSchema, userSchema } from "../schemas/userSchema";
import { publicProcedure, t } from "../utils/trpc";
import bcrypt from "bcrypt";
import { register } from "ts-node";

export const userRouter = t.router({
  getUser: publicProcedure.input(userSchema).query(({ ctx, input }) => {}),
  loginUser: publicProcedure
    .input(loginSchema)
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      bcrypt.compare(input.password, user.password).then(function (result) {
        if (!result) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        ctx.req.session.user = user;
      });
    }),
  registerUser: publicProcedure
    .input(registerSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.create({ data: input });
    }),
});
