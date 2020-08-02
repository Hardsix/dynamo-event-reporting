FROM node:12.18.3
RUN apt-get update
RUN apt-get install python -y

RUN apt-get install imagemagick librsvg2-dev librsvg2-bin -y

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .
RUN rm -f .env

CMD ["npm", "run", "start"]
