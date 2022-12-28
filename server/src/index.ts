import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./utils/trpc";
import { appRouter } from "./routers";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(
  session({
    secret: "flopcus",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "test" });
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
