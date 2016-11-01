FROM java:8-jre

# ---------- Install flyway command line

ENV FLYWAY_VERSION 4.0.3
ENV PATH /flyway:$PATH

RUN wget https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}.tar.gz
RUN tar -xzf flyway-commandline-${FLYWAY_VERSION}.tar.gz
RUN mv /flyway-${FLYWAY_VERSION} /flyway

WORKDIR /flyway

#ENTRYPOINT ["flyway"]
#CMD ["migrate"]

# ---------- Install nvm & node.js

ENV NODE_VERSION 6.9.1
ENV NVM_DIR /usr/local/nvm
ENV NVM_VERSION v0.32.1


# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing \
    && apt-get install -y curl \
    && apt-get install -y build-essential libssl-dev


# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN node -v
RUN flyway -v

# --------- Install app

# Enviroment variables
ENV HOME /home/app
ENV PORT 9001
RUN mkdir -p /home/app

WORKDIR $HOME

COPY package.json .
COPY .babelrc .

RUN npm install

COPY gulpfile.babel.js .
COPY /src ./src/

EXPOSE $PORT
