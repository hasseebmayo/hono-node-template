import { createRoute, type RouteConfig, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

/**
 * Creates an authenticated route with predefined security and response structures.
 *
 * This utility wraps around the `createRoute` function to include:
 * - Bearer token-based security.
 * - Standard `200 OK` and `401 Unauthorized` responses.
 * - Optional additional responses defined in the route configuration.
 *
 * @template P - The path of the route (e.g., '/me').
 * @template R - The configuration of the route, excluding the "path" property.
 *
 * @param {R & { path: P; SuccessResponseSchema?: z.ZodType<any> }} routeConfig - The route configuration.
 *   - `path`: The route's path.
 *   - `SuccessResponseSchema` (optional): A Zod schema for the successful response data. If not provided, the success response contains only a message.
 *   - Other `RouteConfig` properties like `request`, `responses`, etc.
 *
 * @returns The configured route with:
 *   - `200 OK` response, optionally including data from `SuccessResponseSchema`.
 *   - `401 Unauthorized` response.
 *   - Any additional responses specified in `routeConfig.responses`.
 *
 * @example
 * const userDetailsRoute = createAuthController({
 *   path: "/me",
 *   method: "get",
 *   tags: ["AUTH"],
 *   SuccessResponseSchema: z.object({
 *     id: z.number(),
 *     name: z.string(),
 *   }),
 * });
 */
export const createAuthController = <
  P extends string,
  R extends Omit<RouteConfig, "path">
>(
  routeConfig: R & { path: P; SuccessResponseSchema?: z.ZodType<any> }
) => {
  // Construct the success response if a schema is provided


  // Return the route with standard security and responses
  return createRoute({
    ...routeConfig,
    security: [
      {
        Bearer: [],
      },
    ],
    responses: {
      ...routeConfig.responses,
      [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
        z.object({
          message: z.string().openapi({ example: HttpStatusPhrases.UNAUTHORIZED }),
        }),
        HttpStatusPhrases.UNAUTHORIZED
      ),
    },
  });
};
