const express = require('express');

const app = express();

app.get('/', (req,res) => res.send('Hello !'))

app.listen(8080,"192.168.1.140")
console.log("Hello gajs listening to port 8080");
