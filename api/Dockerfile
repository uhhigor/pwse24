FROM node:latest

RUN mkdir -p /home/node/app/node_modules 
ADD . /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
EXPOSE 3000
RUN npm install
CMD ["npm","start"]
