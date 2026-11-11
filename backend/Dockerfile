# -------------------------------------------------------------------
# Stage 1: Build (Compilação do TypeScript e Prisma)
# -------------------------------------------------------------------
FROM node:20-alpine AS builder

# Instala openssl (obrigatório para o Prisma rodar no Alpine Linux)
RUN apk add --no-cache openssl

WORKDIR /app

# Copia arquivos de definição de pacotes
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma.config.ts ./

# Instala todas as dependências (incluindo devDependencies para compilação)
RUN npm install

# Copia o schema do Prisma e gera os binários Linux do Prisma Client
COPY prisma ./prisma/
RUN npx prisma generate

# Copia o código-fonte e compila para JavaScript puro (/dist)
COPY src ./src/
RUN npm run build

# Remove as dependências de desenvolvimento para economizar espaço
RUN npm prune --production

# -------------------------------------------------------------------
# Stage 2: Production Runner (Imagem final limpa e leve)
# -------------------------------------------------------------------
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o que é estritamente necessário da etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Segurança: Executa como usuário padrão não-root do Node
USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]