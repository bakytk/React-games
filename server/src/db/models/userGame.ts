"use strict";

import { Association, DataTypes, Model, Sequelize } from "sequelize";

class Game extends Model {
  public id!: number;
  public UserId!: number;
  public GameId!: string;
  public Favorite: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
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
        },
        Favorite: {
          type: DataTypes.BOOLEAN
        }
      },
      {
        sequelize: sequelize,
        tableName: "User_Games",
        name: {
          singular: "User_Game",
          plural: "User_Games"
        }
      }
    );
  }
}

export default Game;
