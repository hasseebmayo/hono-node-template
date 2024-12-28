import { z } from "@hono/zod-openapi"

export const loginWithEmailSchema = z.object({
    email:z.string({
        required_error:"email is required!"
    }).email(),
    password:z.string({
        required_error:"password is required!"
    }).min(8,"Password must be at least 8 characters long")
})
export const successResponseSchema = z.object({
    message:z.string().openapi({example:"Success"})
})
export const verifyCustomerEmailSchema = z.object({
    token:z.string()
})
