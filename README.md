## csv-to-keyvalue-file

Convert csv file to `json` or `properties` or other file

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
      $ csv-to-keyvalue json --src=example.csv --dst=dict.json --keyColumn=en --valueColumn=ko
      $ csv-to-keyvalue properties --src=example.csv --dst=dict.properties --keyColumn=en --valueColumn=ko
```

### Example

You can obtain the data below by executing the command below to the data below.

`csv-to-keyvalue json --src=example.csv --dst=dict.json --keyColumn=en --valueColumn=ko`

* `Input`: example.csv

```csv

ko,en
권총,pistol
돼지저금통,piggy-bank
브로치,Brooch
알약,pill
지갑,wallet
쌍안경,binoculars
꽃병,vase
...

```

* `Output`: dict.json

```
{
  "권총": "pistol",
  "돼지저금통": "piggy-bank",
  "브로치": "Brooch",
  "알약": "pill",
  "지갑": "wallet",
  "쌍안경": "binoculars",
  "꽃병": "vase",
...
}

```