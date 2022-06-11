const express = require("express");
const router = express.Router();
const cors = require("cors");

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.get("/", cors(corsOptions), async (req, res)=>{
    try{
        console.log("Connected")
        res.send("POST TRANSCRIPT");
    }catch(error){
        console.error(error);
        res.send("ERROR");
        return res.status(500).send("Server error");
    }
});

module.exports = router;
// module.exports = (req, res) => {
//     const { name } = req.body;
//     res.send(
//       `This response would create a new team called ${name}, using a POST request.`,
//     );
//   };