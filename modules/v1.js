const jwt = require('jsonwebtoken');

exports.sign = (user) => {
  const payload = {
    id: user.id,
    user_id: user.user_id,
  };
  const secretKey = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m',
    issuer: 'fl-server',
  };
  return jwt.sign(payload, secretKey, options);
};
