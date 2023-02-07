const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env");
}

import jwt from "jsonwebtoken";
import { DB_POOL } from "../db/config";
import { GET_ALL_USERS, GET_USER, INSERT_USER } from "../db/queries/index";

export const userControllers = {
  signup: async (req, res) => {
    try {
      //validate Body
      let { username, password, country } = req.body;
      if (!(username && password && country)) {
        throw new Error("Username or password absent!");
      }
      let query_str: string = INSERT_USER();
      let result = await DB_POOL.query(query_str, [
        username,
        password,
        country
      ]);
      let tokenData = {
        username
      };
      let token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
      res.json({
        message: "Successful registration!",
        access_token: token
      });
    } catch (e) {
      console.log("signup error", e);
      res.send(`Signup error: ${e.message}`);
    }
  },

  signin: async (req, res) => {
    try {
      let { username, password } = req.body;
      if (!(username && password)) {
        throw new Error("Username or password absent!");
      }
      let query_str: string = GET_USER();
      //console.log("query", query_str, username, password);
      let result = await DB_POOL.query(query_str, [username]);
      if (!(result.rows.length > 0)) {
        throw new Error("Username not found!");
      }
      //console.log("result", result.rows[0]);
      let { password: db_password } = result.rows[0];
      if (db_password != password) {
        throw new Error("Incorrect password!");
      }
      let tokenData = {
        username
      };
      let token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
      res.json({
        message: "Successful authentication!",
        access_token: token
      });
    } catch (e) {
      console.log("signin error", e);
      res.send(`Signin error: ${e.message}`);
    }
  },

  allUsers: async (req, res) => {
    try {
      let { username } = req.decode;
      if (!username) {
        throw new Error("Username not validated");
      }
      let query_str: string = GET_ALL_USERS();
      let result = await DB_POOL.query(query_str);
      //console.log("get result:", result);
      let tokenData = {
        username
      };
      let token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
      res.json({
        data: result.rows
      });
    } catch (e) {
      console.log("allUsers error", e);
      res.send(`allUsers error: ${e.message}`);
    }
  }
};
