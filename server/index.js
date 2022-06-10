const express = require('express');
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const formidable = require("formidable");
const fs = require("fs-extra");
const {spawn} = require('child_process');
const { restart } = require('nodemon');
const {PythonShell} =require('python-shell');
const PDFExtract = require('pdf.js-extract').PDFExtract;
// const PORT = process.env.PORT || 8080;
var pdfUtil = require('pdf-to-text');




 const uploadPath = __dirname + '/uploads/';

 var mydb = mysql.createPool({
     host: "sql3.freemysqlhosting.net",
     user: "sql3498610",
     password: "YhycF8lTEC",
     database: "sql3498610",
     connectionLimit: 10
 });


//  app.post('/upload-avatar', async (req, res) => {
//     console.log("Upload avatar");
//      var form = new formidable.IncomingForm();
//      console.log("FORM BEF");
//      console.log(form);
//      form.parse(req);
//      console.log("FORM AFT");
//      console.log(form);

//      form.on('fileBegin', function (name, file){
//          file.path = __dirname + '/uploads/' + file.name;
//      });

//      form.on('file', function (name, file){
//          console.log('Uploaded ' + file.name);
//      });

//  });


//  app.post('/api/upload', (req, res, next) => {
//     console.log("API UPLOAD\n");
//      const form = new formidable.IncomingForm();
//      form.parse(req, function(err, fields, files){
//           console.log("FORM");
//          console.log("FILES");
//          console.log(files);



//          const src = files.file.filepath;

//          const dest = uploadPath+files.file.originalFilename;


//          fs.move(src, dest, { overwrite: true }).then(() => console.log("File moved to the destination"+" folder successfully")).catch((e) => console.log(e));

//    })
//  });


 app.use(bodyParser.urlencoded({extended: true}));
 application.use(express.json({extended:false}));

 app.use(express.json());
//  app.use(cors());
 app.use(cors({
    origin: 'https://ucsc-courses-website.vercel.app/'
}));
//  app.use(function (req, res, next) {
//      res.header("Access-Control-Allow-origin", "*")
//      res.setHeader('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
//      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//      next();
//  })

//  app.get("/", (req, res) =>{
//      res.send("UCSC Courses Server");
//  })

//  app.get("/test-working", (req, res) =>{
//      console.log("test working");
//      res.send("UCSC Courses Server test");
//  })

//  app.post("/api/post-transcript",(req,res)=>{
//     //  console.log("POSt transcript");
//     //  const form = new formidable.IncomingForm();
//     //  form.parse(req, function(err, fields, files){
//     //      console.log("FILES");
//     //      console.log(files);  
//     //  })
//     res.send("Post Transcript");

//  });

//  app.get("/api/post-transcript",(req,res)=>{
//     //  console.log("POSt transcript");
//     //  const form = new formidable.IncomingForm();
//     //  form.parse(req, function(err, fields, files){
//     //      console.log("FILES");
//     //      console.log(files);  
//     //  })
//     res.send("Post Transcript");

//  });

//  app.post("/api/post-transcript",(req,res)=>{
//     //  console.log("POSt transcript");
//     //  const form = new formidable.IncomingForm();
//     //  form.parse(req, function(err, fields, files){
//     //      console.log("FILES");
//     //      console.log(files);  
//     //  })
//     res.send("Post Transcript");

//  });

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
  
// app.get("/api/post-transcript", cors(corsOptions), (req,res)=>{
//     res.send("TEST2");
//     // const form = new formidable.IncomingForm();

//     // form.parse(req, function(err, fields, files){
//     //     console.log("FILES");
//     //     console.log(files);
//     //     const src = files.file.filepath;
//     //     const dest = uploadPath+files.file.originalFilename;});
// });


// app.post("/api/post-transcript", cors(corsOptions), (req,res)=>{
//     console.log("POSt transcript");
//     res.send("TEST");
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


// app.get("/api/post-transcript",(req,res)=>{
//     console.log("POSt transcript");
//     const form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files){
//         console.log("FILES");
//         console.log(files);
//         const src = files.file.filepath;
//         const dest = uploadPath+files.file.originalFilename;
//         fs.move(src, dest, { overwrite: true }).then(() => console.log("File moved to the destination"+" folder successfully"));
//         var dataToSend;
//         console.log("SPAWN PYTHON");
//         const python = spawn('python', ['./pdfTextExtract.py', files.file.originalFilename]);
//         python.stdout.on('data', function (data) {
//          dataToSend = data.toString();
//          });
//         console.log("CLOSE PYTHON");
//         python.on('close', (code) => {
//         res.send(dataToSend);
//         });
//     })
// });


//  async function getStuff(req, res, retRes){
//     console.log("GET STUFF");
//    const path = require('path');
//    const directoryPath = "D:/python/ucsc_courses_website/server/uploads";
//    await fs.readdir(directoryPath, async function (err, files) {
//        if (err) {
//            return console.log('Unable to scan directory: ' + err);
//        } 
//        files.forEach(function (file) {
//            const python = spawn('python', ['./pdfTextExtract.py', file]);
//            python.stdout.on('data', function (data) {
//                dataToSend = data.toString();
//                retRes.push([dataToSend, file]);
//                console.log(file);

//            });
//            python.on('exit', (code) => {


//              if(retRes.length == files.length){
//                  console.log("DONE READDIR");
//                  console.log("RET RES: ")
//                  console.log(retRes.length);
//                  res.send(retRes);
//              }
//            });
//        });


//    });
//  }

//  app.get("/api/test-get-files", (req, res) =>{
//      console.log("Connected14444")
//      var retRes = [];
//      (req, res, retRes);
//  });

//  app.post("/api/save-test", (req, res) =>{
//      console.log("Connected14")
//      console.log(req.body)
//      fs.writeFile("../test/jstxts/"+req.body[1]+".txt", req.body[0], function (err) {
//          if (err) {
//              return console.log(err);
//          }
//          console.log("The file was saved!");
//      });
//      res.send("saved");
//  })

//  app.get("/api/get-courses", (req, res) =>{
//      console.log("Connected")
//      sql = "SELECT * FROM courses2 WHERE GE != '' ORDER BY GE, Name";
//      mydb.query(sql, function (err, result, fields) {
//          if (err) throw err;
//          res.send(result);
//        });
//  })
 
// app.get("/api/test", async (req, res)=>{
//     try{
//         res.json({
//             status:200,
//             message: "Got data"
//         });
//     }catch(error){
//         console.error(error);
//         return res.status(500).send("Server error");
//     }
// });


// const express = require("express");
// const app = express();
const product = require("./api/product");

app.use("/api/product", product);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`Server is running on port: ${PORT}`));

const getCourses = require("./api/get-courses");
app.use("/api/get-courses", getCourses);

const postTranscript = require("./api/post-transcript");
app.use("api/post-transcript", postTranscript);

// app.listen(PORT, () => {
//     console.log("RUNNING");
// });

// const allowCors = fn => async (req, res) => {
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     if (req.method === 'OPTIONS') {
//       res.status(200).end()
//       return
//     }
//     return await fn(req, res)
//   }
  
// //   const handler = (req, res) => {
// //     const d = new Date()
// //     res.end(d.toString())
// //   }
  
//   module.exports = allowCors(handler)
  
module.export = app;