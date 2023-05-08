const { Command } = require("commander");
const program = new Command();

program
   .version("0.1.0")
   .description("Compares two configuration files and shows a difference.")
   .option("-V, --version", "output the version number");

program.parse();
