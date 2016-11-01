# Context is ./../../ - so the root the the project
FROM mhart/alpine-node:6.9.1

ENV HOME /home
RUN mkdir -p ${HOME}

WORKDIR $HOME

COPY package.json .
COPY .babelrc .

RUN npm install

COPY ./test/integration/*.spec.js ./test/integration/
COPY ./test/mocha.conf.js ./test/
