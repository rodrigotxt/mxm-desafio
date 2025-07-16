// src/middleware/cors.ts
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
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