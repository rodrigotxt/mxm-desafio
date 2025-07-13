// src/middleware/cors.ts
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5176',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

export const corsMiddleware = cors(corsOptions);

// Middleware de autenticação
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: implementar autenticação
  next();
};