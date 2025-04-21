import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import { AppModule } from "./app.module";

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: ["http://localhost:3000"],
    credentials: true
  });

  await app.init();

  await app.listen(3001);
}

bootstrap();

export default server;
