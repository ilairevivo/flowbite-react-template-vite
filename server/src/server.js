const express = require("express");
const router = require("./router/router");
const app = express();
const { handleError } = require("./utlis/errorHandler");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const connectToDB = require("./DB/dbService");
const config = require("config");
const { generateInitialCards, generateInitialUsers } = require("./initalData/initalDataService");
const User = require("./users/models/mongodb/User");
const Card = require("./cards/models/mongodb/Card");
const chalk = require("chalk");

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

app.use((err, req, res, next) => {
  handleError(res, err.status || 500, err.message);
});

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


const PORT = config.get("PORT");

app.listen(PORT, async () => {
  console.log(chalk.cyan(`Server is running on port ${PORT}`));
   connectToDB();
  await initializeData();

  console.log(chalk.green("Server initialization complete!"));
});

module.exports = app;