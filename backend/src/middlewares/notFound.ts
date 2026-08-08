import type { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/appError.js";

// catching request that does not match any route or routes that doesn not exist.
export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found.`, 404));
};
