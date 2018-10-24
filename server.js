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
  let logs = "";
  exect("./test/hello_w.sh", (err, stdout, stderr) => {
    if (err) throw err;

    console.log(stdout);
    logs = stdout;
  });
  res.send(`LOGS \n${logs}`);
});
app.listen(8080);
console.log("Hello gajs listening to port 8080");
