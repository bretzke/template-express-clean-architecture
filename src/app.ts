import express, { NextFunction, Request, Response } from 'express';
import './infra/di/container';
import { router } from './http/routes';
import { ZodError } from 'zod';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());
app.use('/', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: err.issues,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: 'Internal Server Error',
  });
});

export default app;
