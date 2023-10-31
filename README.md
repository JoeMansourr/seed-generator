<h1><i>data-seed-generator</i></h1>

<b>data-seed-generator</b> is an npm package designed to simplify the process of adding random data to your database using either Mongoose or Sequelize ORM. It's particularly useful for generating seed data for testing and development purposes.
Installation

You can install data-seed-generator via npm or yarn:

bash

npm install data-seed-generator
# or
yarn add data-seed-generator

Usage:
With Mongoose

javascript

import { generateSeedDataMongoose } from 'data-seed-generator';

const numUsers = 10;
const mongooseConfig = 'your-mongodb-connection-uri';
const modelName = 'users';

const customFields = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // Add more custom fields as needed
};

generateSeedDataMongoose(numUsers, mongooseConfig, modelName, customFields)
  .then((seededData) => {
    console.log(`Successfully seeded ${seededData.length} records`);
  })
  .catch((error) => {
    console.error(`Seed data generation failed: ${error}`);
  });

With Sequelize:

javascript

import { generateSeedDataSequelize } from 'data-seed-generator';
import { DataTypes } from 'sequelize';

const numUsers = 10;
const customTableSchema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more custom fields as needed
};
const tableName = 'users';

const sequelizeConfig = {
  dialect: 'your-dialect',
  host: 'your-host',
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
};

generateSeedDataSequelize(numUsers, customTableSchema, tableName, sequelizeConfig)
  .then((seededData) => {
    console.log(`Successfully seeded ${seededData.length} records`);
  })
  .catch((error) => {
    console.error(`Seed data generation failed: ${error}`);
  });

Documentation:

    generateSeedDataMongoose(numUsers, mongooseConfig, modelName, customFields): Generates and seeds random data using Mongoose.
    generateSeedDataSequelize(numUsers, customTableSchema, tableName, sequelizeConfig): Generates and seeds random data using Sequelize.

Configuration:

Before using seed-generator, you need to configure your database connections and the structure of the data you want to seed. Make sure to define:

    Mongoose: Provide the MongoDB connection URI, model name, and custom field definitions.
    Sequelize: Configure the dialect, host, username, password, and database name. Define your custom table schema.

Testing:

You can run tests for data-seed-generator using Jest:

bash

npm test
# or
yarn test

License

This package is licensed under the MIT License.
Author: Joe Mansour

Contributing:

Contributions are welcome. Feel free to open issues and pull requests.

For more details and examples, visit the <a href="https://github.com/JoeMansourr/seed-generator">GitHub repository</a>.
