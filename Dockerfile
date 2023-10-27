FROM node:18-alpine AS runner

RUN mkdir -p /app
RUN mkdir -p /app/server

WORKDIR /app/server
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env.example ./.env
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as production

WORKDIR /app/server
ENV NODE_ENV=production
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env.example ./.env
RUN npm install
COPY . .
COPY --from=runner /app/server/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]