const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  cookieSecret: process.env.COOKIE_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};
