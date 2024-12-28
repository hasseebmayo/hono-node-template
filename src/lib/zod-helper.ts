import { successResponseSchema } from "@/schema/auth";
import { ZodSchema } from "@/types";
import {z} from "@hono/zod-openapi"

export const zodResponseSchema = (schema:ZodSchema)=>{
    return z.intersection(successResponseSchema,z.object({
        data:schema
    }))
}
