# Context is ./../../ - so the root the the project
FROM mhart/alpine-node:6.9.1

# Install bash
#RUN apk add --update bash && rm -rf /var/cache/apk/*

# Replace shell with bash so we can source files
#RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# ---------- Install integration test
ENV HOME /home
RUN mkdir -p ${HOME}

WORKDIR $HOME

COPY package.json .
COPY .babelrc .

RUN npm install

COPY ./test/integration/*.spec.js ./test/integration/
COPY ./test/mocha.conf.js ./test/
#COPY ./test/integration/test.sh ./test/integration/
