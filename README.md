# Projeto Backend

## Sobre o Projeto

Este projeto consiste em uma API backend construída com Node.js e TypeScript, utilizando o framework Express para o gerenciamento de rotas e middleware. O projeto usa Prisma como ORM para interagir com o banco de dados, garantindo uma abstração eficiente e segura.

## Tecnologias e Ferramentas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Express**: Framework web rápido, flexível e minimalista.
- **Prisma**: ORM moderno para TypeScript e Node.js.
- **JWT (jsonwebtoken)**: Utilizado para a criação de tokens de autenticação.
- **Bcrypt**: Biblioteca para ajudar na hash de senhas.
- **Cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Módulo para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Configuração Inicial

Antes de iniciar, configure as variáveis de ambiente conforme descrito:

```env
DATABASE_URL="your_database_connection_url"
SECRET_KEY="your_secret_key_for_jwt"
```

## Instalação das Dependências

Instale as dependências com o seguinte comando:

```bash
npm install
```

## Execução

Para desenvolvimento, execute:

```bash
npm run dev
```

Para produção, execute:

```bash
npm run build
npm start
```

## Testes

Para executar os testes, use:

```bash
npm test
```
# Projeto Web

## Sobre o Projeto

Este é um projeto frontend desenvolvido com React e TypeScript, utilizando a ferramenta Vite para a compilação e hot-reloading, e Tailwind CSS para estilização. O projeto oferece uma UI moderna e responsiva, integrada com APIs para funcionalidades dinâmicas.

## Tecnologias e Ferramentas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript**: Linguagem de programação que estende JavaScript adicionando tipagens.
- **Vite**: Ferramenta de build que visa oferecer uma experiência de desenvolvimento mais rápida.
- **Tailwind CSS**: Framework CSS para design rápido e responsivo sem sair do HTML.
- **ESLint**: Linter para identificar e corrigir problemas no código JavaScript/TypeScript.
- **axios**: Cliente HTTP baseado em promessas para fazer requisições.

## Configuração Inicial

Instale as dependências necessárias com o comando:

```bash
npm install
```

## Execução

Para desenvolvimento, execute:

```bash
npm run dev
```

Para produção, execute:

```bash
npm run build
npm run preview
```

## Análise de Código

Para análise de código com ESLint, execute:

```bash
npm run lint
```

