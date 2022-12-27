import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "server/src/routers/index";

export const trpc = createTRPCReact<AppRouter>();
