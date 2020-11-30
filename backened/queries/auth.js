var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
var router = express.Router();

router.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from authd where username like '"+username+"' and password like '"+password+"'",
    (err,result)=>{
        if(err)
        {
           res.send(err)
        }
        else if(result.length === 0)
        {
           console.log("fail")
        }
        else
        {
           res.send(result)
        }
    });
});
router.post('/logint',(req,res)=>{
   var username = req.body.username;
   var password = req.body.password;
   var talukno = req.body.talukno;
   connection.query("select * from auth where username like '"+username+"' and password like '"+password+"' and talukno like "+talukno+"",
   (err,result)=>{
       if(err)
       {
          res.send(err)
       }
       else if(result.length === 0)
       {
          console.log("fail")
       }
       else
       {
          res.send(result)
       }
   });
});

module.exports = router;