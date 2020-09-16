#!/usr/bin/env node

const meow = require("meow");
const exec = require("./exec");

const cli = meow(
  `
    Usage
    $ csv-to-keyvalue <"json" or "properties"> --args

    Required arguments
        <common required args>
        --src, -s               specify source json or properties file
        --dst, -d               specify destination file path
        --keyColumn, -k         specify key column
        --valueColumnm, -v      specify value column

    Examples
        $ csv-to-keyvalue json --src=translation_jsp_utf8.csv --dst=ko.json --keyColumn=Original_text --valueColumn=type
        $ csv-to-keyvalue properties --src=translation_jsp_utf8.csv --dst=ko.json --keyColumn=Original_text --valueColumn=type
`,
  {
    flags: {
      src: {
        type: "string",
        alias: "s",
        isRequired: (flags, input) => {
          return true;
        },
      },
      dst: {
        type: "string",
        alias: "d",
        isRequired: (flags, input) => {
          return true;
        },
      },
      keyColumn: {
        type: "string",
        alias: "k",
        isRequired: (flags, input) => {
          return true;
        },
      },
      valueColumn: {
        type: "string",
        alias: "v",
        isRequired: (flags, input) => {
          return true;
        },
      },
    },
  }
);

exec(cli.input[0], cli.flags);