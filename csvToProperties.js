const fs = require("fs");
const { getProperties } = require("./util");

module.exports = function ({ srcFile, dstFile, keyColumn, valueColumn }) {
  console.log("** source file: " + srcFile);
  console.log("** destination file: " + dstFile);
  console.log("** key column: " + keyColumn);
  console.log("** value column: " + valueColumn);

  let keyColumnIndex = -1;
  let valueColumnIndex = -1;

  const [firstLine, ...cssLines] = fs
    .readFileSync(srcFile)
    .toString()
    .split("\n");

  try {
    const columnNames = firstLine.split(",");

    let i = 0;

    for (let columnName of columnNames) {
      if (columnName.trim() === keyColumn) {
        keyColumnIndex = i;
      } else if (columnName.trim() === valueColumn) {
        valueColumnIndex = i;
      }

      if (keyColumnIndex !== -1 && valueColumnIndex !== -1) break;
      i++;
    }

    if (keyColumnIndex === -1) {
      console.error("Key column name not exists");
      process.exit();
    }

    if (valueColumnIndex === -1) {
      console.error("Value column name not exists");
      process.exit();
    }
  } catch (e) {
    console.error("Css file not found or Empty css file", e);
    process.exit();
  }

  const resultObj = {};

  for (let lineIndex in cssLines) {
    const datas = cssLines[lineIndex].split(",");
    const keyData = datas[keyColumnIndex];
    const valueData = datas[valueColumnIndex];

    resultObj[keyData] = valueData;
  }

  fs.writeFileSync(dstFile, "\ufeff" + getProperties(resultObj), {
    encoding: "utf8",
  });
};
