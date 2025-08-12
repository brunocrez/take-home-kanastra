# Take Home - Kanastra

Este projeto foi desenvolvido como parte de um teste técnico.

## 📜 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/brunocrez/take-home-kanastra.git
cd take-home-kanastra
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

## ⚙️ Configuração do ambiente

1. Na raiz do projeto, crie um arquivo `.env`.
2. Copie as variáveis de ambiente do arquivo `.env.example` para o seu `.env`.

```bash
VITE_SPOTIFY_CLIENT_ID=
VITE_SPOTIFY_CLIENT_SECRET=
```

Não se preocupe com as credenciais utilizadas, pois elas serão excluídas após a avaliação.

## ▶️ Executando a aplicação

Para rodar a aplicação em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação ficará disponível em:

```bash
http://localhost:5173
```

## 🧪 Execução de testes

Para rodar todos os testes, utilize o comando:

```bash
npx vitest
```

## 📂 Estrutura do projeto

```bash
src/
  ├── __tests__
  ├── assets/
  ├── components/
  ├── context/
  ├── hooks/
  ├── lib/
  ├── models/
  ├── pages/
  ├── services/
  └── utils/
```

## 🛠️ Scripts úteis

```bash
npm run dev
npm run build
npx vitest
```

## 🚀 Tecnologias utilizadas

- React + Vite
- React Query
- Tailwind CSS
- ShadcnUI
- Typescript
- React Router
- Axios
- React Testing Library (RTL) + Vitest
