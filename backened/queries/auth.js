var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
var router = express.Router();

router.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from auth where username like '"+username+"' and password like '"+password+"' ",
    (err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else if(result.length === 0)
        {
            res.send("fail ")
        }
        else
        {
            res.send("succes login successful");
        }
    });
});

module.exports = router;