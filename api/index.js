const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const port = 8000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();
const dbUrl = process.env.DATABASE_URL;

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

app.listen(port, "192.168.43.56", () => {
  console.log(
    `Server is running on http://localhost:${port} or http://192.168.43.56:${port}`
  );
});

app.get("/", (_, res) => res.send("Welcome to Amazon Clone api."));

const { register, verifyToken, login } = require("./controllers/auth");
const { addAddress, getAddress } = require("./controllers/address");

app.post("/register", register);
app.post("/login", login);
app.get("/verify/:token", verifyToken);

app.post("/address", addAddress);
app.get("/address/:userId", getAddress);
