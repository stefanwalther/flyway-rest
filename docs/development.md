
```sh
$ docker-compose --f=./docker/docker-compose.dev.yml up --build
```

## pgadmin

pgadmin can be opened at http://localhost:5050

To connect to the test database, find out the IP address first:

```sh
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' flyway_rest_db
```