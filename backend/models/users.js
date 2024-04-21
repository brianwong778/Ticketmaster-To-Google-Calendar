const path = require('path')
require('dotenv').config({
    override: true,
    path: path.join(__dirname, '..','.env')
})
const { Sequelize, DataTypes } = require('sequelize');
const url = process.env.DATABASE_URL;
const sequelize = new Sequelize(url, {
  dialect: 'postgres'
});

// Define the Note model and schema
const User = sequelize.define('User', {
  // Define your columns here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});



// Sync the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Connected to PostgreSQL and synchronized Note model');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
  }
})();

// Export the Note model
module.exports = User;
