import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      numericQueryParams?: Record<string, number>;
    }
  }
}

export function parseNumericQueryParam(key: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const param = parseInt(req.query[key] as string);

    if (isNaN(param) || param < 0) {
      return res.status(400).json({
        error: `Parameter ${key} must be a an integer >= 0.`,
      });
    }

    req.numericQueryParams = { ...req.numericQueryParams, [key]: param };

    next();
  };
}

export function genericErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({ error: "Internal server error." });
}
