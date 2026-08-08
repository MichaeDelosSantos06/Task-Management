import type { RequestHandler } from "express";

// Global error handler to minimize/avoid using try/catch for every async cotroller.
// Catches and forward the errors.
export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
