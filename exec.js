#!/usr/bin/env node
const path = require('path');
const recursive = require("recursive-readdir");

module.exports = (type, commandArguments) => {
  const csvConvert = require("./csvConvert");

  if (commandArguments["dir"]) {
    recursive(path.resolve(commandArguments["src"]), [], (err, files) => {
      const csvFiles = files.map(filePath => {
        const targetFileName = filePath.split(path.sep).reverse()[0];
        if (targetFileName.split(".")[1] === 'csv') return filePath;
      });

      let loopCnt = 1;
      for (let csvFilePath of csvFiles) {
        if (!csvFilePath) continue;
        commandArguments["src"] = csvFilePath;
        console.log(`Processing ${loopCnt++}th file..`);
        csvConvert(type, commandArguments);
      }
      console.log("Jobs done.");
    })
  }
  else {
    csvConvert(type, commandArguments);
  }
};
