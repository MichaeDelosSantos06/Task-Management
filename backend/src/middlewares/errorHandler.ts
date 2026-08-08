import type { NextFunction, Request, Response } from "express";

import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";

// use inside the server after all routes and middleware to catch errors from them.
// receive errors and send the HTTP response
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // If the error is custom AppError use its status code other wise 500.
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  // If custome error message use its message otherwise Internal Server Error.
  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  if (env.NODE_ENV !== "test") {
    console.error(err);
  }

  // ensures every error response has the same structure.
  res.status(statusCode).json({
    success: false,
    message,
  });
};
