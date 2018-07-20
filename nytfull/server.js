const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const routes = require("./routes");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");


app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


