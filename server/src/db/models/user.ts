"use strict";

import { Association, DataTypes, Model, Sequelize } from "sequelize";
import Game from "./game";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public balance: number;
  public country: string;
  public firstName: string;
  public lastName: string;

  public readonly Games?: Game[];

  public static associations: {
    Games: Association<User, Game>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        balance: {
          type: DataTypes.INTEGER
        },
        country: {
          type: DataTypes.STRING,
          allowNull: false
        },
        firstName: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize: sequelize,
        name: {
          singular: "User",
          plural: "Users"
        }
      }
    );
  }
}

export default User;
