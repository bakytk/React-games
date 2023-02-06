export const GET_ALL_USERS = function(): string {
  return `SELECT * FROM "Users"`;
};

export const INSERT_USER = function(): string {
  let now = Date.now();
  return `INSERT INTO "Users" ("username", "password", "country", "balance","createdAt", "updatedAt") VALUES ($1, $2, $3, 0, to_timestamp(${now}), to_timestamp(${now})) RETURNING *`;
};

export const GET_USER = function(): string {
  return `SELECT * FROM "Users" WHERE "username" = $1`;
};

export const UPDATE_USER_BALANCE = function(): string {
  return `UPDATE "Users" SET "balance" = $1 WHERE "username" = $2`;
};

export const GET_GAME = function(): string {
  return `SELECT * FROM "Games" WHERE "id" = $1`;
};

export const INSERT_GAME = function(): string {
  let now = Date.now();
  return `INSERT INTO "Games" ("id", "type", "slug", "title", "providerName", "thumbUrl", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, to_timestamp(${now}), to_timestamp(${now})) RETURNING *`;
};

export const GET_ALL_GAMES = function(): string {
  return `SELECT * FROM "Games"`;
};

//'SELECT * FROM users WHERE id = $1'
//'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *'

//https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
