# Hono Node Template

This is a template for creating a Hono app with Node.js.

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/hasseebmayo/hono-node-template.git
```

2. Navigate to the project directory:

```bash
cd hono-node-template
```

3. Install the dependencies:

```bash
pnpm install
```

4. Create a `.env` file in the root directory and add the following content:

```bash
NODE_ENV = development
PORT = 8080
LOG_LEVEL = debug
DATABASE_URL = {DATABASE_URL}
BETTER_AUTH_SECRET=secret
```

5. Start the server:

```bash
pnpm dev
```

## OnError Middleware

The `onError` middleware is used to handle errors in the application. It catches any errors that occur during the request processing and sends a response with the appropriate status code and error message.

You can throw error from your services or route handlers using _HttpError_ like this:

```bash
throw new HttpError("SOme Message",status_code || 200 );
```

The `onError` middleware will catch the error and send a response with the status code and error message.

```ts
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
```


## Stoker Library
[Stoker](https://github.com/w3cj/stoker) is a library that provides a set of utility functions for working with Hono.

To Streamline the process use the hono , we will be using stoker throughout the project.

### HttpStatus Codes

For status codes, we will use codes from stoker.
```ts
import * as HttpStatus from "stoker/http-status-codes";
```

### HttpStatus Phrases

For status phrases, we will use phrases from stoker.
```ts
import * as Phrases from "stoker/http-status-phrases";
```

## Environment Variables

First add variables to the `.env` file. And then for validation we will use [Zod](https://github.com/colinhacks/zod) for validation.
Go to the file inside of the *src/env.ts*. And add validation there.
```ts
import {env} from "@/env";
// use this for env variables
```
