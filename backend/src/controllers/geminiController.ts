// src/controllers/geminiController.ts
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Lida com a requisição para gerar conteúdo usando a API do Gemini.
 * @param req Requisição Express, esperando { ingredients: string, temperament: string, mode: string } no corpo.
 * @param res Resposta Express.
 */
export const generateContent = async (req: Request, res: Response) => {
  console.log('Gerando conteúdo com a API do Gemini...');
  const { ingredients, temperament, mode } = req.body;

  // Validação básica dos inputs
  if (!ingredients) {
    return res.status(400).json({ message: 'Os ingredientes são obrigatórios.' });
  }

  // Verifica se a chave da API está configurada
  if (!GEMINI_API_KEY) {
    console.error('Erro: GEMINI_API_KEY não definida no arquivo .env');
    return res.status(500).json({ message: 'Chave da API do Gemini não configurada no servidor.' });
  }

  // Constrói o prompt dinâmico para a API do Gemini
  let fullPrompt = `Respoda como um 'gênio da cozinha'. Sugira uma receita simples de forma objetiva com esses ingredientes: ${ingredients}.`;

const caracteristicas = {
  ironico: [
    "de forma irônica e divertida",
    "com sarcasmo como quem oferece carinho... envenenado.",
    "sempre com uma resposta afiada e com um sorriso no rosto.",
    "no limite entre a piada e o deboche.",
    "de forma a não perder a chance de soltar uma indireta elegante.",
    "de forma 'só tô brincando' depois de uma verdade dolorosa."
  ],
  nervoso: [
    "de forma um pouco impaciente, irônica e direta.",
    "de forma ríspida, impaciente e direta.",
    "mal criado e sem paciência até com o vento.",
    "de forma que explode fácil, tipo milho de pipoca em óleo quente.",
    "atravessado até quando tá certo.",
    "como uma bomba relógio em modo soneca.",
    "de forma que não tolera erro — nem seu, nem dos outros."
  ]
};

function sortearHumor(categoria: 'ironico' | 'nervoso') {
  const lista = caracteristicas[categoria];
  return lista[Math.floor(Math.random() * lista.length)];
}

  switch (temperament) {
    case 'Irônico':
      fullPrompt += ` Responda ${sortearHumor('ironico')}`;
      break;
    case 'Nervoso':
      fullPrompt += ` Responda ` + sortearHumor('nervoso');
      break;
    case 'Normal':
    default:
      // Não adiciona nada para temperamento normal
      break;
  }

  if (mode === 'Restritivo') {
    fullPrompt += ` Use SOMENTE os ingredientes citados. Não adicione nenhum outro ingrediente.`;
  }

  try {
    // Prepara o payload para a API do Gemini
    const payload = {
      contents: [
        {
          parts: [
            {
              text: fullPrompt // Usa o prompt construído dinamicamente
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