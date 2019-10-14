var express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser");
routing = require("./requestRouting");

var PORT = 5000,
  app = express(),
  server = http.createServer(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routing);

server.listen(PORT, function() {
  console.log("listening on: " + PORT);
});
