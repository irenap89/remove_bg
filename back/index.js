var fs = require('fs');

const express = require('express');
const app = express();


var cors = require('cors')

app.use(cors())

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(express.static("no_bg_img"));
app.use(express.static("upload_img"));


app.post('/get_img', function (req, res) {

    let date= new Date().getTime();

    let fileName= date + '_' + req.files.file.name;

    let color=req.body.color;

   /// console.log(color);


    req.files.file.mv(__dirname + '/upload_img/' + fileName , async function(err) {
        if(err){
            console.log(err);
        }else{
            ///console.log("uploaded");
            //api remov
            const inputPath = __dirname + '/upload_img/' + fileName; // path to original image
            const fileBlob = await fs.openAsBlob(inputPath) // open original image as blob
            const rbgResultData = await removeBg(fileBlob,color); // send  original image  to function
            fs.writeFileSync(__dirname + '/no_bg_img/' +  'no_bg_'+fileName, Buffer.from(rbgResultData)); // wite response image to folder
            
            res.send(fileName);

        }
   });


})


async function removeBg(blob,color) {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", blob);

    formData.append("bg_color", color);

  
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": "dRB66oeksmdJUuZV4fDKkocx" },
      body: formData,
    });
  
    if (response.ok) {
      return await response.arrayBuffer();
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }



console.log('server start port 3001');

app.listen(3001)