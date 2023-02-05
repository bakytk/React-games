export const GET_USERS = function(): string {
  return `SELECT * FROM user`;
};

export const INSERT_USER = function(): string {
  return `INSERT INTO "user" ("username", "password") VALUES ($1, $2) RETURNING *`;
};

//'SELECT * FROM users WHERE id = $1'
//'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *'

//https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
