const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const formidable = require("formidable-serverless");
const fs = require("fs-extra");
const { restart } = require('nodemon');
const {PythonShell} =require('python-shell');
const PDFExtract = require('pdf.js-extract').PDFExtract;
var pdfUtil = require('pdf-to-text');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.post("/", cors(corsOptions), async (req, res)=>{
    console.log("POSt transcript");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    const form = new formidable.IncomingForm();

    res.send("TEST2");
  // another common pattern
   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // );
    // if (req.method === 'OPTIONS') {
     //   res.status(200).end()
    //   return
    // }

    // form.parse(req, function(err, fields, files){
    //     res.send("POST TEST");
    // });
});

// router.post("/", cors(corsOptions), async (req, res)=>{
//     try{
//         console.log("Connected")
//         res.send("POST TRANSCRIPT");
//     }catch(error){
//         console.error(error);
//         res.send("ERROR");
//         return res.status(500).send("Server error");
//     }
// });


module.exports = router;
// module.exports = (req, res) => {
//     const { name } = req.body;
//     res.send(
//       `This response would create a new team called ${name}, using a POST request.`,
//     );
//   };


// app.post("/api/post-transcript", cors(corsOptions), (req,res)=>{
//     console.log("POSt transcript");
// //     res.setHeader('Access-Control-Allow-Credentials', true);
// //     res.setHeader('Access-Control-Allow-Origin', '*');
// //   // another common pattern
// //   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
// //     // res.setHeader(
// //     //   'Access-Control-Allow-Headers',
// //     //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
// //     // );
// //     // if (req.method === 'OPTIONS') {
// //     //   res.status(200).end()
// //     //   return
// //     // }
// //     const form = new formidable.IncomingForm();

// //     form.parse(req, function(err, fields, files){
// //         console.log("FILES");
// //         console.log(files);
// //         const src = files.file.filepath;
// //         const dest = uploadPath+files.file.originalFilename;
// //         //fs.move(src, dest, { overwrite: true }).then(() => console.log("File moved to the destination"+" folder successfully")).then(() =>{
// //             //console.log("Start Extract");
// //             // const pdfExtract = new PDFExtract();
// //             // const options = {}; /* see below */
// //             // pdfExtract.extract('./uploads/'+files.file.originalFilename, options, (err, data) => {
// //             // if (err) {console.log("ERR");console.log(err); return;}
// //             //     console.log("DATA");
// //             //     console.log(data.text);
// //             //     dataToSend = data;
// //             // });
// //             // console.log("End extract");
            
// //             // pdfUtil.pdfToText("./uploads/"+files.file.originalFilename, function(err, data) {
// //             //     if (err) throw(err);
// //             //     console.log("Data:");
// //             //     console.log(data); //print all text    
// //             //     var dataToSend = data;
// //             //     res.send(dataToSend);
// //             //   });
// //             //console.log("End Extract");

// //         //});


// //         //pdfUtil.pdfToText(src, function(err, data) {
// //         //    if (err) {throw(err);}
// //         //     console.log("Data:");
// //         //     console.log(data); //print all text    
// //         //     var dataToSend = data;
// //         //     res.send(dataToSend);
// //         //});
// //         res.send("TEST");

// //     //     console.log("SPAWN PYTHON");
// //         //const python = spawn();
// //         // const python = spawn('python', ['./pdfTextExtract.py', files.file.originalFilename]);
// //         //python.stdout.on('data', function (data) {
// //         //dataToSend = data.toString();
// //         // });
// //         //console.log("CLOSE PYTHON");
// //         //python.on('close', (code) => {
        
// //         //});
// //     })
// });
