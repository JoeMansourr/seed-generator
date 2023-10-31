import mongoose from 'mongoose';
import { generateSeedDataMongoose } from '../src/seedGenerator';
import dotenv from 'dotenv';
dotenv.config();

describe('Mongoose Data Seeding', () => {
  jest.setTimeout(30000);

  let connection;

  beforeAll(async () => {
    if (!process.env.MONGODB_URI) {
      throw new Error('Please set the environment variables for the database connection.');
    }

    connection = await mongoose.connect(process.env.MONGODB_URI);
  }, 30000);

  afterAll(async () => {
    if(connection) await connection.disconnect();
  }, 30000)

  it('should generate and seed the specified number of users with dynamic fields', async () => {
    const numUsers = 1; // Change the number of users as needed.

    if (numUsers <= 0) {
      throw new Error('Please specify a number greater than 0.');
    }

    //mongoose config
    const mongooseConfig = process.env.MONGODB_URI;

    //model name
    const modelName = "users";

    //custom fields
    const customFields = {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: false
      },
      location: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      }
    };

    const result = await generateSeedDataMongoose(
      numUsers,
      mongooseConfig,
      modelName,
      customFields
    );
    expect(result).toHaveLength(numUsers);
  }, 30000);
});
