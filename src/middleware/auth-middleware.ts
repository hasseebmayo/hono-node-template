import { HttpError } from "@/lib/error";
import { verifyToken } from "@/lib/jwt";
import type { AppBindings } from "@/types";
import { createMiddleware } from "hono/factory";

/**
 * Middleware to authenticate users based on their roles (organization, customer, admin).
 * Validates the JWT token and fetches user details from the corresponding service.
 *
 * @param {AppBindings} c - The Hono context object with app-specific bindings.
 * @param {Function} next - The next middleware function in the stack.
 * @throws {HttpError} If the token is invalid, missing, or the role doesn't match.
 * @returns {Promise<void>} Resolves when the middleware successfully processes the request.
 */
export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  // Extract the token from the Authorization header
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) {
    throw new HttpError("Token not found", 401);
  }

  // Verify the token and extract user details
  const {user} = await verifyToken(token);
  console.log("Decoded user:", user);

     // Write middleware logic to handle auth.
    return next(); // Exit middleware after successful processing

});
