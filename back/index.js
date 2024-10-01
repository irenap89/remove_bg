const express = require('express');
const app = express();

var cors = require('cors')

app.use(cors())

var fileupload = require("express-fileupload");
app.use(fileupload());

app.post('/get_img', function (req, res) {


    console.log(req);

    res.send('Hello Worlddfsgsdfgsdfg dfg')
})

console.log('server start port 3001');

app.listen(3001)