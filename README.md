### Usage

```
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
```
