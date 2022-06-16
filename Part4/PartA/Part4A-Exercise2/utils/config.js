require('dotenv').config()

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI

module.exports = {
  MONGO_URI,
  PORT
}