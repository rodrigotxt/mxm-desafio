// server.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
import { corsMiddleware } from './src/middleware/cors';
import authRoutes from './src/routes/auth';

dotenv.config(); // Carrega as variáveis de ambiente

const app = express(); // Cria a instância do aplicativo Express

connectDB(); // Conecta ao MongoDB

app.use(express.json()); // Middleware para analisar JSON no corpo das requisições
app.use(corsMiddleware); // Aplica o middleware CORS

app.use('/api/auth', authRoutes); // Define as rotas de autenticação

app.get('/', (req: Request, res: Response) => {
  res.send('API está funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});