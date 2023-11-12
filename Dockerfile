# node required
FROM node:18

# create app directory
RUN mkdir -p /app/
WORKDIR /app/

# copy env, config, package files
COPY .env \ tsconfig.json \ package*.json \ nest-cli.json ./

# install dependencies
RUN npm install

# Bundle app source
ENV NODE_ENV production

RUN npm run build

COPY . .

# expose port for application
EXPOSE 4000

# start with production settings
CMD ["node", "dist/src/main"]