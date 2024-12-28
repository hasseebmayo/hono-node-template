import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound,  } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import type { AppBindings} from "@/types";
import { pinoLogger } from "@/middleware/pino-logger";
import onError from "@/middleware/error-middleware";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);
  return app;
}
