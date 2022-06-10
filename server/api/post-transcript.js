const express = require("express");
const router = express.Router();
const mysql = require("mysql");

var mydb = mysql.createPool({
    host: "sql3.freemysqlhosting.net",
    user: "sql3498610",
    password: "YhycF8lTEC",
    database: "sql3498610",
    connectionLimit: 10
});


router.post("/", async (req, res)=>{
    try{
        console.log("Connected")
        res.send("POST TRANSCRIPT");
    }catch(error){
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;