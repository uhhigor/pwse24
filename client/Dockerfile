FROM node:latest
RUN mkdir -p /home/node/app/node_modules
ADD . /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
