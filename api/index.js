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

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

const userRouter = require("./routers/user");

app.use("/user", userRouter);
