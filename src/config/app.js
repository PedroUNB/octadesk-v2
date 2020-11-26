require("./mongodb");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

class App {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors({ origin: "*" }));
        this.express.use(morgan("tiny"));
        this.express.use(
            "/files",
            express.static(
                path.resolve(__dirname, "..", "..", "tmp", "uploads")
            )
        );
    }

    routes() {
        this.express.use(require("./routes"));
    }
}

module.exports = new App().express;
