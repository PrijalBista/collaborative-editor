FROM node:16

#create app directory
WORKDIR /user/app

# install app dependencies
COPY package*.json .

RUN npm install

# bundle app source
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

