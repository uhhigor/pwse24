FROM node:alpine
RUN mkdir -p /home/node/app/node_modules
ADD . /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
RUN apk add jq
RUN ./swap.sh
RUN npm install
EXPOSE 5005
CMD ["npm","start"]
