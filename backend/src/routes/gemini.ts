// src/routes/gemini.ts
import { Router } from 'express';
import { generateContent } from '../controllers/geminiController';

const router = Router();

// Rota POST para gerar conteúdo com a API do Gemini
router.post('/generate', generateContent);

export default router;
