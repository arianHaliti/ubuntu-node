const express = require("express");
const exect = require("child_process").exec;
const ip = require("ip");
const app = express();

let ip_address = ip.address();
let port = 8080;
app.get("/", (req, res) => {
  res.render("index.hbs", {
    pageTitle: "Home page",

    welcome: "Welcome to home page"
  });
});

app.get("/logs", (req, res) => {
  let log = req.query.log;
  let path = req.query.path;
  let inter = req.query.inter;

  exect(
    `./../test/hello_w.sh ${log} ${path} ${inter} >> /home/arian/testOut&`,
    (err, stdout, stderr) => {
      if (err) return console.log(err);
      console.log(stdout);
      res.send(stdout);
    }
  );
});

// app.get("/stop",(req,res)=>{
//   exect("",(err,stdout,stderr)=>{
//     if(err) return console.log(err);

//   })
// })
app.listen(port, () => {
  console.log(`Listening to ${ip_address}:${port}`);
});
