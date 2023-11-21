FROM node:16.18.0

WORKDIR /usr/src/app/frontend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]