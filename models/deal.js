// Import Sequelize and database connection
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update the path as per your project setup

// Define the Deal model
const Deal = sequelize.define('Deal', {
  // Primary Key: deal_id
  deal_id: {
    type: DataTypes.UUID, // Unique identifier for each deal
    defaultValue: DataTypes.UUIDV4, // Automatically generates a unique ID
    primaryKey: true, // Mark this as the primary key
  },

  // Author of the deal (user_id reference)
  author: {
    type: DataTypes.UUID, // UUID to reference the user who created the deal
    allowNull: false, // This field is required
  },

  // Description of the deal
  description: {
    type: DataTypes.STRING, // String for the deal description
    allowNull: false, // This field is required
  },

  // Bundle number
  bundle_number: {
    type: DataTypes.INTEGER, // Number to track the bundle
    allowNull: false, // This field is required
  },

  // Timestamp when the deal was created
  timestamp: {
    type: DataTypes.DATE, // Date and time
    defaultValue: DataTypes.NOW, // Automatically sets the current time as default
    allowNull: false, // This field is required
  },

  // Category of the deal
  category: {
    type: DataTypes.STRING, // String to represent category (e.g., "Food", "Travel")
    allowNull: true, // Optional field
  },

  // Array of joined users (user IDs)
  joined_users: {
    type: DataTypes.ARRAY(DataTypes.UUID), // Array of user IDs
    defaultValue: [], // Default to an empty array
    allowNull: true, // Optional field
  },

  // Array of comments (comment IDs)
  comments: {
    type: DataTypes.ARRAY(DataTypes.UUID), // Array of comment IDs
    defaultValue: [], // Default to an empty array
    allowNull: true, // Optional field
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  tableName: 'deals', // Table name in the database
});

// Export the model
module.exports = Deal;
