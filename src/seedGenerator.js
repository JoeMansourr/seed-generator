import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import casual from "casual";

/**
 * 
 * @param {*} numOfRecords
 * @param {*} customTableSchema 
 * @param {*} tableName 
 * @param {*} sequelizeConfig 
 */
export async function generateSeedDataSequelize(numOfRecords, customTableSchema, tableName, sequelizeConfig = {}) {
  /**
   * Create a Sequelize instance
   */
  const sequelize = new Sequelize(sequelizeConfig);

  /**
   * Define a dynamic Sequelize model based on the customTableSchema object
   */
  const DynamicModel = sequelize.define(tableName, customTableSchema);

  const sequelizeSeedData = [];

  for (let i = 0; i < numOfRecords; i++) {
    const dynamicRecord = {};

    /**
     * Generate random data for each field defined in customTableSchema
     */
    for (const field in customTableSchema) {
      dynamicRecord[field] = casual[field] || ""; // Use casual for random data or set a default value
    }

    sequelizeSeedData.push(dynamicRecord);
  }

  await DynamicModel.sync({ force: true });
  return DynamicModel.bulkCreate(sequelizeSeedData);
}

/**
 * 
 * @param {*} numOfRecords 
 * @param {*} mongooseConfig 
 * @param {*} modelName 
 * @param {*} customFields 
 * @returns 
 */

/**
 * Generate seed data for mongoose
 */
export async function generateSeedDataMongoose(numOfRecords, mongooseConfig, modelName, customFields = {}) {
  await mongoose.connect(mongooseConfig);

  /**
   * Define a dynamic Mongoose schema based on the customFields object
   */
  const dynamicSchema = new mongoose.Schema(customFields);

  const User = mongoose.model(modelName, dynamicSchema);

  const mongooseSeedData = [];

  for (let i = 0; i < numOfRecords; i++) {
    const dynamicRecord = {};

    /**
     * Generate random data for each field defined in customFields
     */
    for (const field in customFields) {
      dynamicRecord[field] = casual[field] || ""; // Use casual for random data or set a default value
    }

    mongooseSeedData.push(dynamicRecord);
  }

  return User.insertMany(mongooseSeedData);
}

