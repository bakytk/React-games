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

export const ADD_COL_USER_GAMES = function(): string {
  return `ALTER TABLE "User_Games"
    ADD COLUMN "Favorite" BOOLEAN DEFAULT FALSE;`;
};

export const INSERT_USER_GAME = function(): string {
  let now = Date.now();
  return `INSERT INTO "User_Games"
    ("UserId", "GameId", "Favorite", "createdAt", "updatedAt")
    VALUES ($1, $2, $3, to_timestamp(${now}), to_timestamp(${now})) RETURNING *`;
};

export const GET_ALL_USER_GAMES = function(): string {
  return `SELECT * FROM "User_Games"`;
};

export const GET_FAVORITE_GAMES = function(): string {
  /*
    "Favorite"
  */
  return `
    SELECT "UserId", "GameId" FROM (
      SELECT * FROM "Users" u
      INNER JOIN (
        SELECT * FROM "User_Games" WHERE "GameId" IN (
          SELECT "id" FROM "Games" WHERE "type" = 'SLOT')
      ) g ON u.id = g."UserId"
    ) sub
    `;
};
