const fs = require('fs');
const parse = require('csv-parse');

module.exports = {
  isStop: false,
  async readline(csvPath, callback) {
    const stream = fs.createReadStream(csvPath);
    const parser = stream.pipe(
      parse({
        columns: true,
        delimiter: ',',
        trim: true,
        skip_empty_lines: true,
      })
    );

    console.log('start');

    // eslint-disable-next-line no-restricted-syntax
    for await (const record of parser) {
      callback(record);
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (this.isStop) {
        break;
      }
    }

    console.log('end');
  },
};
