import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Lida com a requisição para gerar conteúdo usando a API do Gemini.
 * @param req Requisição Express, esperando { prompt: string } no corpo.
 * @param res Resposta Express.
 */
export const generateContent = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  // Validação básica do prompt
  if (!prompt) {
    return res.status(400).json({ message: 'O prompt é obrigatório.' });
  }

  // Verifica se a chave da API está configurada
  if (!GEMINI_API_KEY) {
    console.error('Erro: GEMINI_API_KEY não definida no arquivo .env');
    return res.status(500).json({ message: 'Chave da API do Gemini não configurada no servidor.' });
  }

  try {
    // Prepara o payload para a API do Gemini
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    // Faz a chamada para a API do Gemini
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // Verifica se a resposta da API do Gemini foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao chamar a API do Gemini:', errorData);
      return res.status(response.status).json({
        message: 'Erro ao gerar conteúdo da API do Gemini.',
        details: errorData
      });
    }

    const result = await response.json();

    // Extrai o texto da resposta (estrutura pode variar, ajuste conforme necessário)
    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const generatedText = result.candidates[0].content.parts[0].text;
      res.status(200).json({ generatedText });
    } else {
      // Lida com casos onde a estrutura da resposta é inesperada
      res.status(500).json({ message: 'Resposta da API do Gemini em formato inesperado.', rawResponse: result });
    }

  } catch (error: any) {
    console.error('Erro no servidor ao processar requisição Gemini:', error);
    res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
};

