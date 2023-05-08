const { Command } = require("commander");
const program = new Command();

program
   .version("0.2.0")
   .description("Compares two configuration files and shows a difference.")
   .option("-f, --format <type>", "output format")
   .arguments("<filepath1> <filepath2>");

program.parse();
