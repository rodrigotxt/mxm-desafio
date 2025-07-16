// src/middleware/cors.ts
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

export const corsMiddleware = cors(corsOptions);

// Middleware de autenticação
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: implementar autenticação
  console.log('Autenticação bem-sucedida!');
  next();
};