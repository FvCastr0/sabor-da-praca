import serverlessExpress from "@vendia/serverless-express";
import "reflect-metadata";
import "tsconfig-paths/register";
import { createNestApp } from "./main.helper";

let cachedHandler;

export const handler = async (event, context) => {
  if (!cachedHandler) {
    const app = await createNestApp();
    cachedHandler = serverlessExpress({ app });
  }
  return cachedHandler(event, context);
};
