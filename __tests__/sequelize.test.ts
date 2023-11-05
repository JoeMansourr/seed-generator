import { Sequelize } from "sequelize";
import { generateSeedDataSequelize } from "../src/seedGenerator";
import { DataTypes } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

describe("Data Seeding", () => {
  let sequelize: any;

  beforeAll(async () => {
    if (!process.env.DB_DIALECT && !process.env.DB_HOST && !process.env.DB_USER && !process.env.DB_PASSWORD && !process.env.DB_NAME) {
      throw new Error("Please set the environment variables for the database connection.");
    }

    const sequelizeConfig: {} = {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    sequelize = new Sequelize(sequelizeConfig);
  });

  afterAll(async () => {
    if (sequelize) {
      await sequelize.close();
    }
  });

  it("should generate and seed the specified number of users with dynamic fields", async () => {
    const numUsers = 5;

    if (numUsers <= 0) {
      throw new Error("Please specify a number greater than 0.");
    }

    //custom table schema
    const customTableSchema = {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      }
    };

    //table name
    const tableName = "users";

    //sequelize db connection
    const sequelizeConfig = {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    if(sequelize.isDefined(tableName)) {
      await sequelize.drop(tableName);
    }

    const result = await generateSeedDataSequelize(
      numUsers,
      customTableSchema,
      tableName,
      sequelizeConfig
    );
    expect(result).toHaveLength(numUsers);
  });
});
