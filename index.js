
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory blog storage
let formData = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { formData });
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { formData });
});

app.post("/compose", (req, res) => {
    // Add new blog content to formData
    if (req.body.blogContent) {
        formData.push(req.body.blogContent);
    }
    res.redirect("/blogs");
});
app.post("/clear", (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && index >= 0 && index < formData.length) {
        formData.splice(index, 1);
    }
    res.redirect("/blogs");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});