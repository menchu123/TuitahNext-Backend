const debug = require("debug")("db");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (stringConnection) =>
  new Promise((resolve, reject) => {
    mongoose.connect(stringConnection, (error) => {
      if (error) {
        debug(chalk.red("I can't connected database"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.bgBlueBright.black.bold("Connect to the basadate"));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.green("Desconectado de la base de datos"));
    });
  });

module.exports = connectDB;
