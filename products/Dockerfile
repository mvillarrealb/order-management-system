FROM node:10-alpine
RUN mkdir -p /service
WORKDIR /service
COPY dist /service
COPY config /service
COPY package.json /service
RUN npm install --production
CMD [ "npm", "run", "start:prod" ]