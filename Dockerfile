FROM node:18.17.0-alpine AS build
RUN mkdir -p /server
WORKDIR /server
COPY package.json /server
RUN npm install
COPY . /server
EXPOSE 5000
CMD ["npm", "run", "serve"]