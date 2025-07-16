// src/server.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { corsMiddleware } from './middleware/cors';
import authRoutes from './routes/auth';
import GeminiRoutes from './routes/gemini';

dotenv.config();

const app = express();

connectDB(); // Conecta ao MongoDB

app.use(express.json()); // Middleware para analisar JSON no corpo das requisições
app.use(corsMiddleware); // Aplica o middleware CORS

app.use('/api/auth', authRoutes); // Define as rotas de autenticação

app.use('/api/ia', GeminiRoutes); // Define as rotas de IA

app.get('/', (req: Request, res: Response) => {
  res.send('API está funcionando!');
});

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

