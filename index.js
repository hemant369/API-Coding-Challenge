const express = require("express");
const movieRouter = require('./src/controller/movie.controller');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/movieapi", movieRouter);

app.get("/", function (req, res) {
    let resultStr = "<h1 align='center'>Welcome to Movies Page<h1/>";

    res.send(resultStr);
});

app.listen(3002, function () { });
console.log("Server Application is started. Url : http://localhost:3002");
