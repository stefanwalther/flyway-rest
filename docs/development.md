
## Start the Development Environment

```sh
$ docker-compose --f=./docker/docker-compose.dev.yml up --build
```

This will spin up the following containers:

- flyway_rest_db
- flyway_rest
- flyway_pgadmin


### pgadmin

[pgadmin](https://www.pgadmin.org/) is part of the development environment.  
pgadmin can be opened at http://localhost:5050

To connect to the test database, find out the IP address first:

```sh
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' flyway-rest-db
```

Then use the IP-address in pgadmin and username `postgres` with password `postgres`.