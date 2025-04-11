import serverlessExpress from "@vendia/serverless-express";
import { createNestApp } from "./main.helper";

let cachedHandler;

export const handler = async (event, context) => {
  if (!cachedHandler) {
    const expressApp = await createNestApp();
    cachedHandler = serverlessExpress({ app: expressApp });
  }
  return cachedHandler(event, context);
};
