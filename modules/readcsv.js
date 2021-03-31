const fs = require('fs');
const parse = require('csv-parse');

module.exports = async (csvPath, callback) => {
  const stream = fs.createReadStream(csvPath);
  const parser = stream.pipe(
    parse({
      columns: true,
      delimiter: ',',
      trim: true,
      skip_empty_lines: true,
    })
  );

  let count = 0;
  process.stdout.write('start\n');

  for await (const record of parser) {
    process.stdout.write(`${count++} ${Object.values(record).join(',')}\n`);
    await new Promise((resolve) => setTimeout(resolve(callback), 100));
  }
  process.stdout.write('end\n');
};
