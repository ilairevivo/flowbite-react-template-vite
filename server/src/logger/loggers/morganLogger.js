const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const morgan = require("morgan");
const currentDateTimeStr = require("../../utlis/dateTimeStr");

const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, "server.log");

const morganLogger = morgan((tokens, req, res) => {
  const status = Number(tokens.status(req, res));
  const logMessage = [ 
    currentDateTimeStr,
    tokens.method(req, res),
    tokens.url(req, res),
    status,
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  
  fs.appendFileSync(logFilePath, logMessage + "\n", "utf8");
  return (status >= 400 ? chalk.redBright : chalk.cyanBright)(logMessage);
});

module.exports = morganLogger;