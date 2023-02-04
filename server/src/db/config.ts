const {
  DB_USER,
  DB_PWD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DOCKER_ENV,
  MONGODB_URI
} = process.env;

let DB_URL: string = "";

if (DOCKER_ENV) {
  DB_URL =
    `mongodb://${DB_USER}:${DB_PWD}@` +
    `${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
} else {
  DB_URL = MONGODB_URI;
}

export { DB_URL };
