import { successResponseSchema } from "@/schema/auth";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatus from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
export const first_route = createRoute({
    method:"get",
    path:"/",
    tags:["First Route"],
    description:"This is the first route",
    request:{

    },
    responses:{
        [HttpStatus.OK]:jsonContent(successResponseSchema,
            "Success Response will be this....."
        ),
        [HttpStatus.BAD_REQUEST]:jsonContent(successResponseSchema,
            "Bad Request"
        ),
    }
})

export type first_route_type = typeof first_route;
