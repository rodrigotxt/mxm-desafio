import mongoose, { Schema, Document, Types } from 'mongoose'; // Importa 'Types' do mongoose
import bcrypt from 'bcryptjs';

// Interface que define a estrutura de um documento de usuário
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  // Método para comparar senhas
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define o esquema do usuário
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Armazena o email em minúsculas
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, {
  timestamps: true,
});

// Pré-salvamento (pre-save hook) para hash da senha antes de salvar no banco de dados
UserSchema.pre<IUser>('save', async function (next) {
  // Só faz o hash da senha se ela foi modificada ou é nova
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10); // Gera um salt para o hash
    this.password = await bcrypt.hash(this.password, salt); // Faz o hash da senha
    next();
  } catch (error: any) {
    next(error); // Passa o erro para o próximo middleware
  }
});

// Método para comparar a senha fornecida com a senha hash no banco de dados
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exporta o modelo de usuário
export default mongoose.model<IUser>('User', UserSchema);

