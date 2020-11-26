require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev",
});
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("[MONGO] Connected");
    })
    .catch(() => {
        console.log("[MONGO] Error");
    });
mongoose.Promise = global.Promise;

module.exports = mongoose;
