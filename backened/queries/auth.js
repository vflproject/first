var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
const { UV_FS_O_FILEMAP } = require('constants');
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
router.post("/loginmail", (req,res)=>{
   var idd = req.body.idd;
   var nn = "suhas"
   if(idd===0)
   {
      connection.query("select email from authd where username like '"+nn+"'",
      (err,result)=>{
           if(err)
           {
              res.send(err);
           }
           else
           {
              res.send(result);
           } 
      })
   }
   else
   {
      connection.query("select email from auth where talukno = "+idd+"",
      (err,result)=>{
           if(err)
           {
              res.send(err);
           }
           else{
              res.send(result);
           } 
      })
   }
})
router.post('/logint',(req,res)=>{
   var username = req.body.username;
   var password = req.body.password;
   var talukno = req.body.talukno;
   connection.query("select * from auth where username='"+username+"' and password='"+password+"' and talukno="+talukno+"",
   (err,result)=>{
       if(err)
       {
          res.send(err)
       }
       else if(result.length === 0)
       {
          res.send({
             "name" : "failure"
          })
       }
       else
       {
          res.send({
             "name" : "success"
          })
       }
   });
});
router.post('/loginedit',(req,res)=>{
      var password = req.body.password;
      var tno1 = req.body.tno;
      var tno = parseInt(tno1);
      if(tno===0)
      {
         connection.query("update authd set password='"+password+"'",
         (err,result)=>{
            if(err)
            {
               console.log(err);
            }
            else{
               res.send(result)
            }
         })
      }
      else
      {
         connection.query("update auth set password='"+password+"' where talukno="+tno+" ",
         (err,result)=>{
            if(err)
            {
               console.log(err);
            }
            else{
               console.log("success");
            }
         })
      }
})
router.post('/currentedit',(req,res)=>{
   var curid = req.body.id;
   connection.query("update currentuser set number="+curid+"",
   (err,result)=>{
      if(err)
      {
         console.log(err);
      }
      else{
         res.send("success")
      }
   })
})
router.get('/getuser',(req,res)=>{
   connection.query("select number from currentuser",
   (err,result)=>{
      if(err)
      {
         console.log(err)
      }
      else{
         res.send(result);
      }
   })
})
router.get('/getuserdetail',(req,res)=>{
   connection.query("select username,talukname from taluka,auth where talukno=talukid and talukid=(select number from currentuser)",
   (err,result)=>{
      if(err)
      {
         console.log(err);
      }
      else{
         res.send(result);
      }
   })
})
router.get('/getbydist',(req,res)=>{
   connection.query("select username from authd",
   (err,result)=>{
      if(err)
      {
         console.log(err);
      }
      else
      {
         res.send(result);
      }
   })
})
module.exports = router;