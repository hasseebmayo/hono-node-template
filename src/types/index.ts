import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import {z} from "@hono/zod-openapi";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    user:IPayload;
  };
};
export type IAppRoles = "organization" | "customer" | "organization_user"  | "admin";
export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;

export interface IPayload {
    user_id:number;
    role:IAppRoles;
    email:string;

}
