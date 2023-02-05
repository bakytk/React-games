//https://fly.io/blog/using-heroku-postgres-from-a-fly-app/
//https://blog.logrocket.com/using-sequelize-with-typescript/

const DOCKER_ENV: string = process.env.DOCKER_ENV || "";
const DB_DOCKER_HOST: string = process.env.DB_DOCKER_HOST || "";
const DB_CLOUD_HOST: string = process.env.DB_CLOUD_HOST || "";
const DB_NAME: string = process.env.DB_NAME || "";
const DB_USER: string = process.env.DB_USER || "";
const DB_PWD: string = process.env.DB_PWD || "";

let DB_HOST: string = "";
if (DOCKER_ENV) {
  DB_HOST = DB_DOCKER_HOST;
} else {
  DB_HOST = DB_CLOUD_HOST;
}

export { DB_NAME, DB_USER, DB_HOST, DB_PWD };
