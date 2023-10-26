const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbUrl = "mongodb+srv://sukrit:sukrit@cluster0.eqboegp.mongodb.net/";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database 🎉");
  })
  .catch((error) => {
    console.log("Error❗", error);
  });

app.listen(port, "192.168.140.150", () => {
  console.log(
    `Server is running on http://localhost:${port} or http://192.168.140.150:${port}`
  );
});

app.get("/", (_, res) => res.send("Welcome to Amazon Clone api."));

const { register, verifyToken, login } = require("./controllers/auth");

app.post("/register", register);
app.post("/login", login);
app.get("/verify/:token", verifyToken);
