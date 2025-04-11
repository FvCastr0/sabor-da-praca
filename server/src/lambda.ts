import serverlessExpress from "@vendia/serverless-express";
import "reflect-metadata";
import "tsconfig-paths/register";
import { createNestApp } from "./main.helper";

let cachedHandler: any;

export const handler = async (req: any, res: any) => {
  if (!cachedHandler) {
    const app = await createNestApp();
    cachedHandler = serverlessExpress({ app });
  }
  return cachedHandler(req, res);
};
