FROM node:17.0.0


WORKDIR app

COPY dist dist
COPY package.json .
COPY package-lock.json .
COPY .env . 

EXPOSE 4000

RUN npm install --production

CMD ["npm", "run", "start"]