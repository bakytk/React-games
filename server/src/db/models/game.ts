"use strict";

import { Association, DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";

class Game extends Model {
  public id!: string;
  public type!: string;
  public slug: string;
  public title: string;
  public providerName: string;
  public thumbUrl: string;

  public readonly Users?: User[];

  public static associations: {
    Games: Association<User, Game>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        slug: {
          type: DataTypes.STRING
        },
        title: {
          type: DataTypes.STRING
        },
        providerName: {
          type: DataTypes.STRING
        },
        thumbUrl: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize: sequelize,
        name: {
          singular: "Game",
          plural: "Games"
        }
      }
    );
  }
}

export default Game;
