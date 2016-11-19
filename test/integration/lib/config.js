
export const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';
export const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
export const FLYWAY_REST_URL = `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}`;
export const FLYWAY_REST_DB_HOST = process.env.FLYWAY_REST_DB_HOST || 'flyway_rest_db';
export const FLYWAY_REST_DB_PORT = process.env.FLYWAY_REST_DB_PORT || 5432;
export const FLYWAY_REST_DB_URL = ``;
