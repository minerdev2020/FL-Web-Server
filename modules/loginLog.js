const fs = require('fs');
const path = require('path');
const util = require('util');
const moment = require('moment');

module.exports = {
  writeLog: (userInfo) => {
    console.log(userInfo);
    const now = moment().format('YYYY-MM-DD HH:mm:ss ZZ');
    fs.appendFile(
      path.join(__dirname, `../logs/login_${userInfo.id}.log`),
      `[${now}] ${userInfo.user_id} ${userInfo.ip}\n`,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  },

  readLog: async (userInfo) => {
    const readFile = util.promisify(fs.readFile);
    console.log(userInfo);
    return readFile(path.join(__dirname, `../logs/login_${userInfo.id}.log`));
  },
};
