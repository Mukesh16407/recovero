const express = require("express");
const app = express();
const connect = require("./config/dbConfig");

require("dotenv").config();
app.use(express.json());

const userRoute = require("./routes/userRoute");



const port = process.env.PORT || 5000;

app.listen(port, () => {
    connect()
    console.log(`Server listening on port ${port}`);
  });