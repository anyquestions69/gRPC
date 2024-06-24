const client = require("./config/gRPCclient");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/:id", (req, res) => {
    client.get(req.params, (err, data) => {
        console.log(data)
        if (!err) {
            return res.send(data);
        }
    });
});
app.get("/", (req, res) => {
    client.getAll(null, (err, data) => {
        console.log(err)
        console.log(data.users)
        if (!err) {
            return res.send(data.users);
        }
    });
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});