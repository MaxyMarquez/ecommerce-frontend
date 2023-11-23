FROM node:21-alpine3.17

WORKDIR /usr/src/app/frontend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]