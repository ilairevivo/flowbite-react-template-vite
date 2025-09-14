const data = require('./initialData.json');
const normalizeUser = require('../users/helpers/normalizeUser');
const normalizeCard = require('../cards/helpers/normalizeCard');
const { register } = require('../users/models/userDataAccessServise');
const { create } = require('../cards/models/cardsDataAccesServise');
const { generateUserPassword } = require('../users/helpers/bcrypt');
const chalk = require('chalk');

const generateInitialCards = async () => {
    const { cards } = data;
    const user_id = "6376274068d78742d84f31d2"; 

    for (const card of cards) {
        try {
            const cardWithUserId = { ...card, user_id }; 
            const normalizedCardData = await normalizeCard(cardWithUserId);
            await create(normalizedCardData);
            console.log(chalk.green(`Card "${card.title}" created successfully`));
        } catch (error) {
            console.log(chalk.red(`Error creating card "${card.title}":`, error.message));
        }
    }
}

const generateInitialUsers = async () => {
    const { users } = data;

    for (const user of users) {
        try {
            const userCopy = { ...user };
            userCopy.password = await generateUserPassword(user.password);
            const normalizedUserData = normalizeUser(userCopy);
            await register(normalizedUserData);
            console.log(chalk.green(`User "${user.email}" created successfully`));
        } catch (error) {
            console.log(chalk.red(`Error creating user "${user.email}":`, error.message));
        }
    }
}

const initializeData = async () => {
    try {
        const usersCount = await User.countDocuments();
        const cardsCount = await Card.countDocuments();

        if (usersCount === 0) {
            console.log(chalk.yellow("No users found, creating initial users..."));
            await generateInitialUsers();
        } else {
            console.log(chalk.blue(`Found ${usersCount} existing users`));
        }

        if (cardsCount === 0) {
            console.log(chalk.yellow("No cards found, creating initial cards..."));
            await generateInitialCards();
        } else {
            console.log(chalk.blue(`Found ${cardsCount} existing cards`));
        }
    } catch (error) {
        console.error(chalk.red("Error initializing data:", error));
    }
};

module.exports = { initializeData, generateInitialUsers, generateInitialCards };