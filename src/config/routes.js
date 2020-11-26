const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./multer");

const { Octadesk } = require("./octadesk/octa");
const OCTA_URL = "https://api.octadesk.services";
const OCTA_TOKEN = "aocta.37WOO1EDZdSe.jFCGNdULDDH";
const OCTA_USER = "fernando@eduqc.com";

const octa = new Octadesk(OCTA_URL, OCTA_TOKEN, OCTA_USER);

const Post = require("../app/schemas/Post");

routes.get("/attachments", async (req, res) => {
    const posts = await Post.find();

    return res.json(posts);
});

routes.post(
    "/attachments",
    multer(multerConfig).single("file"),
    async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;
        const fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gim;

        const extension = name.match(fileExtensionPattern)[0];
        const post = await Post.create({
            name,
            size,
            key,
            extension,
            url,
        });

        return res.json(post);
    }
);

routes.delete("/attachments/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.json({ message: "The file was removed" });
});

module.exports = routes;
