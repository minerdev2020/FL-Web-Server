const fs = require('fs');
const path = require('path');
const util = require('util');

module.exports = {
  writeLog: (userInfo) => {
    console.log(userInfo);
    fs.appendFile(
      path.join(__dirname, `../logs/login_${userInfo.id}.log`),
      `${new Date()} ${userInfo.user_id} ${userInfo.ip}\n`,
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
