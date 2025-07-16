# 🍳 Gênio da Cozinha App

**Bem-vindo(a) ao ****Gênio da Cozinha****! Este é um aplicativo fullstack que permite aos utilizadores obter sugestões de receitas personalizadas com base nos ingredientes que possuem, no temperamento do "Gênio" e no modo de restrição dos ingredientes. A magia acontece através da integração com a API do Google Gemini.**

## 🚀 Tecnologias Utilizadas

**Este projeto é construído com uma arquitetura moderna e escalável, utilizando as seguintes tecnologias:**

### Frontend

* **Vue 3 + Vite (TypeScript):** Um framework progressivo para construção de interfaces de utilizador, com o Vite para um ambiente de desenvolvimento rápido e TypeScript para tipagem segura.
* **Vue Router:** Para gerir a navegação e as rotas da aplicação (telas autenticadas e não autenticadas).
* **Pinia:** Um gestor de estado leve e intuitivo para Vue.js.
* **Tailwind CSS:** Um framework CSS utility-first para estilização rápida e responsiva.

### Backend

* **Node.js + Express:** Um ambiente de execução JavaScript e um framework web minimalista para construir a API RESTful.
* **MongoDB (com Mongoose):** Um banco de dados NoSQL orientado a documentos para persistência de dados, com Mongoose como ODM (Object Data Modeling).
* **JSON Web Tokens (JWT):** Para autenticação e autorização de utilizadores. (a implementar)
* **Middleware + CORS:** Para gerir requisições HTTP e permitir a comunicação entre frontend e backend de diferentes origens.
* **API do Google Gemini:** Integrada para gerar as sugestões de receitas.

## ✨ Funcionalidades

* **Autenticação de Utilizador:** Registo e login de utilizadores com JWT. (dados mockados)
* **Interface Intuitiva:** Uma imagem do "Gênio da Cozinha" que, ao ser clicada, revela um modal para interação.
* **Pedido de Receitas Personalizado:**
  * **Input para listar os ingredientes disponíveis.**
  * **Opções de "Temperamento do Gênio" (Normal, Irónico, Nervoso) para influenciar o estilo da resposta da IA.**
  * **Opções de "Modo" (Normal, Restritivo) para controlar se a IA deve usar apenas os ingredientes citados.**
* **Geração de Receitas com IA:** Utiliza a API do Google Gemini para criar receitas dinamicamente.
* **Exibição de Resultados:** As receitas geradas são exibidas de forma clara abaixo da imagem do Gênio.

## 📂 Estrutura do Projeto

**O projeto é organizado num monorepo com duas pastas principais:**

```
mmx-desafio/
├── frontend/  # Código do frontend (Vue 3)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # CSS global (Tailwind)
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── router/             # Configuração do Vue Router
│   │   ├── stores/             # Stores Pinia (autenticação)
│   │   └── views/              # Componentes de página (Login, Dashboard, GeminiChat)
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── backend/   # Código do backend (Node.js/Express)
│   ├── src/
│   │   ├── config/             # Configuração do DB
│   │   ├── controllers/        # Lógica de negócio (autenticação, Gemini)
│   │   ├── middleware/         # Middlewares (CORS, autenticação)
│   │   ├── models/             # Modelos Mongoose (Utilizador)
│   │   └── routes/             # Definição de rotas da API
│   ├── .env                    # Variáveis de ambiente (NÃO FAÇA COMMIT!)
│   ├── dist/                   # Código JavaScript compilado (gerado pelo tsc)
│   ├── package.json
│   └── tsconfig.json
├── mongodb/   # Docker para subir o banco
│   ├── docker-compose.yml # Docker Compose para o mongodb
└── README.md                   # Este ficheiro

```

## ⚙️ Configuração do Ambiente

### Pré-requisitos

**Certifique-se de ter o seguinte software instalado na sua máquina:**

* **Node.js** (versão 20.x ou superior)
* **npm** (gerenciador de pacotes do Node.js)
* **Docker** e **Docker Compose** (opcional, mas recomendado para ambiente de desenvolvimento)
* **MongoDB:** Pode ser uma instância local, um cluster MongoDB Atlas, ou um container Docker.

### Variáveis de Ambiente (`<span class="selected">.env</span>`)

**Na raiz da pasta **`<span class="selected">backend/</span>`, crie um ficheiro chamado `<span class="selected">.env</span>` (sem extensão). Este ficheiro conterá as variáveis de ambiente sensíveis.

```
PORT=3000
MONGODB_URI=mongodb://adminUser:adminPassword@mongodb:27017/mydatabase # Ou a sua string do MongoDB Atlas
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_troque_isso_em_producao
GEMINI_API_KEY=SUA_CHAVE_API_GEMINI_AQUI # Obtenha a sua chave da Google AI Studio

```

* **`<span class="selected">MONGODB_URI</span>`****:**
  * **Se usar Docker Compose para o MongoDB (como no **`<span class="selected">docker-compose.yml</span>` raiz), use `<span class="selected">mongodb://adminUser:adminPassword@mongodb:27017/mydatabase</span>`.
  * **Se usar MongoDB local, use **`<span class="selected">mongodb://localhost:27017/mydatabase</span>`.
  * **Se usar MongoDB Atlas, use a sua string de conexão fornecida pelo Atlas.**
* **`<span class="selected">JWT_SECRET</span>`****: Uma string longa e aleatória para assinar os tokens JWT.**
* **`<span class="selected">GEMINI_API_KEY</span>`****: A sua chave da API do Google Gemini. Obtenha-a em **[Google AI Studio](https://aistudio.google.com/app/apikey "null").

## ▶️ Como Rodar a Aplicação

### Opção 1: Rodar Frontend e Backend Separadamente

#### Backend

1. **Navegue até a pasta do backend:**

   ```
   cd backend

   ```
2. **Instale as dependências:**

   ```
   npm install

   ```
3. **Compile o código TypeScript (para modo de produção):**

   ```
   npm run build

   ```
4. **Inicie o servidor backend:**

   * **Modo de Desenvolvimento (com hot-reload):**
     ```
     npm run dev

     ```
   * **Modo de Produção:**
     ```
     npm start

     ```

   **O backend estará a correr em **`<span class="selected">http://localhost:3000</span>`.

#### Frontend

1. **Navegue até a pasta do frontend:**

   ```
   cd frontend

   ```
2. **Instale as dependências:**

   ```
   npm install

   ```
3. **Inicie o servidor de desenvolvimento do frontend:**

   ```
   npm run dev

   ```

   **O frontend estará a correr em **`<span class="selected">http://localhost:5176</span>` (ou outra porta que o Vite atribuir).

### Opção 2: Rodar com Docker Compose (Aplicação Completa)

**Certifique-se de que o Docker e o Docker Compose estão instalados e a correr.**

1. **Construa as imagens Docker:**
   * **Navegue até a raiz do projeto (onde está o **`<span class="selected">docker-compose.yml</span>` principal):

     ```
     cd my-fullstack-app # ou o nome da sua pasta raiz

     ```
   * **Execute o comando para construir e iniciar os containers:**

     ```
     docker-compose up --build -d

     ```

     * `<span class="selected">--build</span>`: Força a reconstrução das imagens (útil na primeira vez ou após alterações nos Dockerfiles).
     * `<span class="selected">-d</span>`: Inicia os containers em segundo plano.
2. **Aceda à Aplicação:**
   * **Frontend: **`<span class="selected">http://localhost:5176</span>`
   * **Backend API: **`<span class="selected">http://localhost:3000</span>`

## 🔑 Uso da API do Gemini

**A API do Google Gemini é consumida de forma segura através do backend. A sua **`<span class="selected">GEMINI_API_KEY</span>` é armazenada no ficheiro `<span class="selected">.env</span>` do backend e nunca é exposta diretamente ao frontend.

**As requisições do frontend para o backend na rota **`<span class="selected">/api/ai/generate</span>` são protegidas por JWT. O frontend obtém o token após o login e o envia no cabeçalho `<span class="selected">Authorization</span>`.

## 💡 Próximos Passos e Melhorias

* **Persistência de Sessão:** Implementar a persistência do estado de autenticação no frontend (ex: com `<span class="selected">localStorage</span>`).
* **Validação de Entrada:** Adicionar validação de dados mais robusta no backend (ex: com Joi ou Express-Validator).
* Implementação completa do JWT no backend e frontend.
* **Tratamento de Erros:** Melhorar o tratamento de erros globalmente no backend e exibir mensagens mais amigáveis no frontend.
* **Mais Funcionalidades da IA:** Explorar outros recursos da API do Gemini (ex: geração de imagens, modelos mais avançados).
* **UI/UX:** Aprimorar a interface de utilizador e a experiência do utilizador com mais animações, transições e um design mais polido.
* **Testes:** Adicionar testes unitários e de integração para frontend e backend.
* **CI/CD:** Configurar um pipeline de CI/CD para automatizar o build, teste e implantação.

**Sinta-se à vontade para explorar, modificar e expandir este projeto! Se tiver dúvidas ou precisar de ajuda, não hesite em perguntar.
