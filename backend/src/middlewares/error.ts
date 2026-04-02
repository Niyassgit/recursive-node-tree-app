import { Request, Response, NextFunction } from "express";

interface GlobalError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const globalErrorHandler = (
  err: GlobalError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  console.error("ERROR 💥: ", err);
  return res.status(500).json({
    success: false,
    status: "error",
    message: "Something went very wrong!",
  });
};
