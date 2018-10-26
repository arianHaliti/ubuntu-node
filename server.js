const express = require("express");
const exect = require("child_process").exec;
const ip = require("ip");
const app = express();

let ip_address =ip.address();
let port = 8080;
app.get("/", (req, res) => {
  res.render("index.hbs", {
    pageTitle: "Home page",

    welcome: "Welcome to home page"
  });
});

app.get("/logs", (req, res) => {
  exect("./../test/hello_w.sh NODE! >> /home/arian/testOut&", (err, stdout, stderr) => {
    if (err) return console.log(err);
    console.log(stdout);
    res.send(stdout);
    
  });
});
app.listen(port, ()=>{
  console.log(`Listening to ${ip_address}:${port}`)
});
