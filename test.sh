#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
COMPOSE_FILE='./test/integration/docker-compose.yml'
WAIT_FOR='flyway_rest_integration'

cleanup () {
  docker-compose -p ci kill
  docker-compose -p ci rm -f
}

docker-compose --file=${COMPOSE_FILE} -p ci build
docker-compose --file=${COMPOSE_FILE} -p ci up -d

if [ $? -ne 0 ] ; then
  printf "${RED}Docker Compose Failed${NC}\n"
  exit -1
fi

TEST_EXIT_CODE=`docker wait ${WAIT_FOR}`
docker logs flyway_rest_integration
if [ -z ${TEST_EXIT_CODE+x} ] || [ "$TEST_EXIT_CODE" -ne 0 ] ; then
  printf "${RED}Tests Failed${NC} - Exit Code: $TEST_EXIT_CODE\n"
else
  printf "${GREEN}Tests Passed${NC}\n"
fi
cleanup
exit $TEST_EXIT_CODE

#docker-compose --file=${COMPOSE_FILE} ps -q | xargs docker inspect -f '{{ .State.ExitCode }}' | while read code; do
#    if [ "$code" == "1" ]; then
#       exit -1
#    fi
#done
