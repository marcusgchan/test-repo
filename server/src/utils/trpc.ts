import { Prisma, User } from "@prisma/client";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import prisma from "./client";

export const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
    user: req.session.user,
    prisma,
  };
};
type Context = inferAsyncReturnType<typeof createContext>;
