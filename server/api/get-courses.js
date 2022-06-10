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


router.get("/", async (req, res)=>{
    try{
        console.log("Connected")
        sql = "SELECT * FROM courses2 WHERE GE != '' ORDER BY GE, Name";
        mydb.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
          });
    }catch(error){
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;