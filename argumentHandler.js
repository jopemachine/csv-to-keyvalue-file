const errHandler = require('./util').err;

module.exports = function argumentHandler(commandArguments) {
  const argument = {};

  const argMap = new Map;

  for (commandArgument of commandArguments) {
    if (commandArgument.startsWith("--")) {
      // To do : Add options
    } else if (commandArgument.startsWith("-")) {
      // To do : Add options
    } else if (commandArgument.includes("=")) {
      const group = commandArgument.split("=");
      const key = group[0];
      const value = group[1];

      argMap.set(key, value);
    } else {
      // To do : Add options
    }
  }

  for ([argKey, value] of argMap) {
    switch (argKey) {
      case "keyColumn":
        argument.keyColumn = value;
        break;
      case "valueColumn":
        argument.valueColumn = value;
        break;
      case "s":
      case "src":
        argument.srcFile = value;
        break;
      case "d":
      case "dst":
        argument.dstFile = value;
        break;
      default:
        errHandler();
    }
  }

  if (!argument['keyColumn'] || !argument['valueColumn'] || !argument['srcFile'] || !argument['dstFile']) {
    errHandler();
  }

  return argument;
}