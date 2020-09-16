#!/usr/bin/env node

module.exports = (type, commandArguments) => {
  const csvToJsonExec = require("./csvToJson");
  const csvToPropertiesExec = require("./csvToProperties");
  const { err } = require('./util');

  if (type) {
    switch (type) {
      case "json":
        csvToJsonExec(argvHandler(commandArguments));
        break;
      case "properties":
        csvToPropertiesExec(argvHandler(commandArguments));
        break;
      default:
        err();
        break;
    }
  } else {
    // To do : print help option
  }
};
