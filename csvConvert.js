const fs = require("fs");
const path = require('path');
const { getProperties } = require("./util");

module.exports = function (type, { src, dst, keyColumn, valueColumn, filter, dir }) {

  const absPath = path.resolve(src);
  const [targetFileName, ...targetPathArr] = absPath.split(path.sep).reverse();
  const targetPath = targetPathArr.reverse().join(path.sep);

  if (dir && dst) dst = `${targetPath}${path.sep}${dst}_${targetFileName.split(".")[0]}`
  if (!dst) dst = `${targetPath}${path.sep}${targetFileName.split(".")[0]}`;

  console.log("** source file: " + src);
  console.log("** destination file: " + dst);
  console.log("** key column: " + keyColumn);
  console.log("** value column: " + valueColumn);

  const [firstLine, ...cssLines] = fs.readFileSync(src).toString().split("\n");

  let mapColumnToIdx;

  try {
    const columnNames = firstLine.split(",");
    mapColumnToIdx = new Map();
    let i = 0;

    for (let columnName of columnNames) {
      mapColumnToIdx.set(columnName.trim(), i++);
    }

    if (!mapColumnToIdx.has(keyColumn)) {
      console.error("Key column name not exists");
      process.exit();
    }

    if (!mapColumnToIdx.has(valueColumn)) {
      console.error("Value column name not exists");
      return;
    }
  } catch (e) {
    console.error("Csv file not found or Empty csv file", e);
    return;
  }

  const resultObj = {};

  for (let lineIndex in cssLines) {
    const rawDatas = cssLines[lineIndex].split(",");
    const datas = (columnName) => rawDatas[mapColumnToIdx.get(columnName)];

    if ((filter && eval(filter)) || !filter) {
      if (datas(valueColumn).trim() === '') continue;
      resultObj[`${datas(keyColumn)}`] = datas(valueColumn).trim();
      // resultObj[`#${datas("base_key")}_"${datas(keyColumn)}"`] = datas(valueColumn).trim();
      // resultObj[`#${datas("base_key")}_'${datas(keyColumn)}'`] = datas(valueColumn).trim();
    }
  }

  switch (type) {
    case "json":
      fs.writeFileSync(dst, "\ufeff" + JSON.stringify(resultObj, null, 2), {
        encoding: "utf8",
      });
      break;
    case "properties":
      fs.writeFileSync(dst, "\ufeff" + getProperties(resultObj), {
        encoding: "utf8",
      });
      break;
    default:
      console.error("Not supported mode.\nPossible value is 'json' or 'properties'");
      break;
  }

  console.log();
};
