const express = require("express");
const connectToDb = require("./config/db.config.js");
const authRouter = require("./routes/authRouter.js");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        connectToDb
            .connectToDb()
            .then(() => console.log("Connected to MongoDB Atlas"))
            .catch(console.log);
    } catch (e) {
        console.log(e);
    }
};

start();
