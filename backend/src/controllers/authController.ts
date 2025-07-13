import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Obtém a chave secreta JWT das variáveis de ambiente
const JWT_SECRET = process.env.JWT_SECRET as string;

// Função auxiliar para gerar um token JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '1h', // O token expira em 1 hora
  });
};

/**
 * Registra um novo usuário.
 * @param req Requisição Express
 * @param res Resposta Express
 */
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validação básica de entrada
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, insira todos os campos.' });
  }

  try {
    // Verifica se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe com este email.' });
    }

    // Cria um novo usuário
    user = await User.create({ email, password });

    // Gera um token JWT para o novo usuário
    const token = generateToken((user!._id as any).toString());

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor ao registrar usuário.', error: error.message });
  }
};

/**
 * Autentica um usuário (login).
 * @param req Requisição Express
 * @param res Resposta Express
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validação básica de entrada
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, insira todos os campos.' });
  }

  try {
    // Encontra o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com a senha hash no banco de dados
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Gera um token JWT para o usuário autenticado
    const token = generateToken((user!._id as any).toString());

    res.status(200).json({
      message: 'Login bem-sucedido!',
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro no servidor ao fazer login.', error: error.message });
  }
};

