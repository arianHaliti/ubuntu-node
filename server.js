const express = require("express");
const exect = require("child_process").exec;

const app = express();

app.get("/", (req, res) => {
  res.render("index.hbs", {
    pageTitle: "Home page",

    welcome: "Welcome to home page"
  });
});

app.get("/logs", (req, res) => {
  
  exect("./../test/hello_w.sh", (err, stdout, stderr) => {
    if (err) return console.log(err);
    console.log(stdout);
    res.send(stdout);
  });

});
app.listen(8080,"192.168.1.140");
console.log("Hello gajs listening to port 8080");
