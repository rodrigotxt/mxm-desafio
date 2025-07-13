// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error('Erro: MONGODB_URI não definida no arquivo .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB conectado com sucesso!');
  } catch (error: any) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;