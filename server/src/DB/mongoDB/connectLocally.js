const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://localhost:27017/business_card_app')
    .then(() => {
        console.log(chalk.magentaBright('MongoDB connected successfully'));
    })
    .catch((error) => {
        console.error(chalk.red('MongoDB connection error:', error));
    });