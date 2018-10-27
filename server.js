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
    `./../test/hello_w.sh ${log} ${inter} >> ${path}&`,
    (err, stdout, stderr) => {
      if (err) return console.log(err);
      
      res.send(stdout);
    }
  );
});

 app.get("/stop",(req,res)=>{
   exect("ps -aux | grep [h]ello | awk '{print $2}'",(err,stdout,stderr)=>{
     if(err) return console.log(err);
     
     let stdout_id = stdout.replace('\n',' ');
     
      exect("kill -9 "+stdout_id,(err,stdout,stderr)=>{
        if(err) return console.log(err);
          
        })
     let ids = stdout.trim().split("\n");

     res.send(ids);
   })
 })
 app.get("/check" ,(req,res)=>{
   exect("ps -aux | grep [h]ello | awk '{print $2}'",(err,stdout,stderr)=>{
    //console.log(stdout.trim());
    // let data = ""+stdout;
     res.send(stdout.trim());
    })
  })
app.listen(port, () => {
  console.log(`Listening to ${ip_address}:${port}`);
});
