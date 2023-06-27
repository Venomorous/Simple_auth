const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDb() {
    await mongoose.connect(process.env.DB_CONNECTION_STR);
}

mongoose.connection.on("error", (err) => {
    console.log(err);
});

module.exports = {
    connectToDb,
};
