#!/usr/bin/env node

const meow = require('meow')
const exec = require('./exec')

const cli = meow(
  `
    Usage
        $ csv-to-keyvalue <"json" or "properties"> --args


    Required arguments

        <common required args>
            --src, -s               specify source json or properties file
            --keyColumn, -k         specify key column
            --valueColumnm, -v      specify value column
          
        <optional argument>
            --dst, -d               specify destination file path, default value is srcFile's name
            --filter, -f            specify the filter conditions. you can access data variable using datas("columnName")
            --dir                   applies css-convert given in src to all csv files in the path, using the directory path.
                                    (dst value is used as prefix value)


    Examples
        $ csv-to-keyvalue json --src=example.csv --dst=ko.json --keyColumn=en --valueColumn=ko
        $ csv-to-keyvalue properties --src=example.csv --dst=ko.json --keyColumn=en --valueColumn=ko
`,
  {
    flags: {
      src: {
        type: 'string',
        alias: 's',
        isRequired: (flags, input) => true
      },
      dst: {
        type: 'string',
        alias: 'd',
        isRequired: (flags, input) => false
      },
      keyColumn: {
        type: 'string',
        alias: 'k',
        isRequired: (flags, input) => true
      },
      valueColumn: {
        type: 'string',
        alias: 'v',
        isRequired: (flags, input) => true
      },
      filter: {
        type: 'string',
        alias: 'f',
        isRequired: (flags, input) => false
      },
      dir: {
        type: 'boolean',
        alias: 'di',
        isRequired: (flags, input) => false
      }
    }
  }
)

exec(cli.input[0], cli.flags)
