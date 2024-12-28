import { HttpError } from "@/lib/error";
import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as Phrases from "stoker/http-status-phrases";


const onError: ErrorHandler = (err, c) => {
  // Handle custom HttpError

  if (err instanceof HttpError) {
    return c.json(
      {
        message: err.message,
        success: false
      },
      err.statusCode as StatusCode
    );
  }

  // Get current status from error or response
  const currentStatus = "status" in err
    ? err.status
    : c.res.status;

  // Determine final status code
  const statusCode = currentStatus !== HttpStatusCodes.OK
    ? (currentStatus as StatusCode)
    : (HttpStatusCodes.INTERNAL_SERVER_ERROR as StatusCode);

  // Get environment
  const env = c.env?.NODE_ENV ?? process.env.NODE_ENV ?? 'development';

    // Handle JWT-related errors
    if (err.name === "JwtTokenExpired") {
        return c.json(
          {
            message: "Token has expired, please log in again.",
            success: false,
          },
          HttpStatusCodes.UNAUTHORIZED as StatusCode
        );
      }

      if (err.name === "JwtTokenInvalid") {
        return c.json(
          {
            message: "Invalid token.",
            success: false,
          },
          HttpStatusCodes.UNAUTHORIZED as StatusCode
        );
      }
  // Return error response
  return c.json(
    {
      message: err.message || Phrases.INTERNAL_SERVER_ERROR,
      success: false,
      stack: env === "production" ? undefined : err.stack,
    },
    statusCode
  );
};

export default onError;
