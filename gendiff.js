const { Command } = require("commander");
const program = new Command();
const path = require("node:path");
const fs = require("fs");
const genDiff = require(".");

program
   .version("0.2.0")
   .description("Compares two configuration files and shows a difference.")
   .option("-f, --format <type>", "output format")
   .arguments("<filepath1> <filepath2>")
   .action((filepath1, filepath2) => {
      const obj1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, filepath1)));
      const obj2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, filepath2)));
      console.log(genDiff(obj1, obj2));
   });

program.parse();
