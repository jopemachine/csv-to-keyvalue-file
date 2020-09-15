#!/usr/bin/env node

const argvHandler = require('./argumentHandler');
const csvToJsonExec = require('./csvToJson');
const csvToPropertiesExec = require('./csvToProperties');

const type = process.argv[2];
const commandArguments = process.argv.slice(3);

if (process.argv.length > 1) {
  switch (type) {
    case "json":
      csvToJsonExec(argvHandler(commandArguments));
      break;
    case "properties":
      csvToPropertiesExec(argvHandler(commandArguments));
      break;
  }
} else {
  // To do : print help option
}