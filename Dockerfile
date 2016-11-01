FROM node:6.9.1

# Enviroment variables
ENV HOME=/home/app
ENV PORT=9001
RUN mkdir -p /home/app

WORKDIR $HOME

COPY package.json .
COPY .babelrc .

RUN npm install

COPY gulpfile.babel.js .
COPY /src ./src/

EXPOSE 9001
