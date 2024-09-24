require("dotenv").config();
const mongoose = require("mongoose");

async function mongodb() {
  return await mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
}
module.exports = mongodb;
