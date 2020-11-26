require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev",
});
const app = require("./config/app");

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("[HOST] Server is running on port:", port);
});
