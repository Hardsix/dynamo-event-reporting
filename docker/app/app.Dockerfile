FROM node:13.10.1-alpine3.10

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .
RUN rm -f .env

CMD ["npm", "run", "start"]
