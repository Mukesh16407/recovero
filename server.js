const express = require("express");
const app = express();
const connect = require("./config/dbConfig");

require("dotenv").config();
const path = require("path");

app.use(express.json());

const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
    connect()
    console.log(`Server listening on port ${port}`);
  });