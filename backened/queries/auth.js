var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
const { UV_FS_O_FILEMAP } = require('constants');
var router = express.Router();
// login district
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
//select mail and confirm msg 
router.post("/loginmail", (req,res)=>{
   var idd = req.body.idd;
   if(idd===0)
   {
      connection.query("select email from authd ",
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
//login taluk
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
//edit password
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
//dont read no use
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
//NO USE THIS COMMAND PLEAse dont read
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
// get user details to navbar display
router.get('/getuserdetail/:id',(req,res)=>{
   var vv = req.params.id;
   connection.query("select username,talukname from taluka,auth where talukno=talukid and talukid="+vv+"",
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
//username extraction 
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