"use strict";

import { Association, DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";
import Game from "./game";

class Game extends Model {
  public id!: number;
  public UserId!: number;
  public GameId!: string;
  public Favorite: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        UserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: false,
          references: {
            model: "User",
            key: "id"
          },
          onDelete: "cascade",
          onUpdate: "cascade"
        },
        GameId: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: false,
          references: {
            model: "Game",
            key: "id"
          },
          onDelete: "cascade",
          onUpdate: "cascade"
        }
      },
      {
        sequelize: sequelize,
        name: {
          singular: "User_Game",
          plural: "User_Games"
        }
      }
    );
  }
}

export default Game;
