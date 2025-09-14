const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config');

const dbName = config.get("DB_NAME");
const dbPassword = config.get("DB_PASSWORD");

mongoose.connect(`mongodb+srv://${dbName}:${dbPassword}@cluster0.ycfduhs.mongodb.net/`)
    .then(() => {
        console.log(chalk.green('MongoDB Atlas connected successfully'));
    })
    .catch((error) => {
        console.error(chalk.red('MongoDB Atlas connection error:', error));
    });
