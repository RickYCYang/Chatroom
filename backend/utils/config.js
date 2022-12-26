const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(dotenv.config());

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  SECRET,
  SECRET_KEY,
  PORT,
};
