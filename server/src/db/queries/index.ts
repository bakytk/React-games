export const GET_USERS = function(): string {
  return `SELECT * FROM "Users"`;
};

export const INSERT_USER = function(): string {
  let now = Date.now();
  return `INSERT INTO "Users" ("username", "password", "country", "balance","createdAt", "updatedAt") VALUES ($1, $2, $3, 0, to_timestamp(${now}), to_timestamp(${now})) RETURNING *`;
};

//'SELECT * FROM users WHERE id = $1'
//'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *'

//https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
