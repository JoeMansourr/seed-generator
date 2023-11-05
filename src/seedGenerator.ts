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
export const generateSeedDataSequelize = async (numOfRecords: number, customTableSchema: any, tableName: string, sequelizeConfig = {}) => {
  // Create a Sequelize instance
  const sequelize = new Sequelize(sequelizeConfig);
  let Model;

  // Check if the model already exists
  if (sequelize.isDefined(tableName)) {
    Model = sequelize.model(tableName);
  } else {
    // If the model doesn't exist, define it
    Model = sequelize.define(tableName, customTableSchema);
  }

  const sequelizeSeedData = [];

  for (let i = 0; i < numOfRecords; i++) {
    const dynamicRecord: any = {};

    // Generate random data for each field defined in customTableSchema
    for (const field in customTableSchema) {
      dynamicRecord[field] = casual[field as keyof (typeof casual)] || ''; // Use casual for random data or set a default value
    }

    sequelizeSeedData.push(dynamicRecord);
  }

  // Drop and recreate the table with the new data
  await Model.sync({ force: true });

  // Insert the seed data
  return Model.bulkCreate(sequelizeSeedData);
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
export const generateSeedDataMongoose = async (numOfRecords: number, mongooseConfig: any, modelName: string, customFields = {}) => {
  await mongoose.connect(mongooseConfig);

  // Check if the model already exists
  let Model;
  try {
    Model = mongoose.model(modelName);
  } catch (e) {
    // If the model doesn't exist, create it
    const dynamicSchema = new mongoose.Schema(customFields);
    Model = mongoose.model(modelName, dynamicSchema);
  }

  const mongooseSeedData = [];

  for (let i = 0; i < numOfRecords; i++) {
    const dynamicRecord: any = {};

    // Generate random data for each field defined in customFields
    for (const field in customFields) {
      dynamicRecord[field] = casual[field as keyof (typeof casual)] || ""; // Use casual for random data or set a default value
    }

    mongooseSeedData.push(dynamicRecord);
  }

  return Model.insertMany(mongooseSeedData);
}

