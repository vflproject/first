var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
var router = express.Router();

router.get('/viewtalukas',(req,res)=>{
    connection.query("select * from taluka", 
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
});

router.post('/talukdetail',(req,res)=>{
    var talukid = req.body.talukid;
    connection.query(" select cropid,cropname,produce,requirement from dist1,crop where cropno=cropid and talukno="+talukid+"",
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
})

router.get("/distcrop",(req,res)=>{
    connection.query("select * from dist1",
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
})
router.get("/distcrop/onlycrop",(req,res)=>{
    connection.query("select cropname from dist1",
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
})
router.post("/distcrop/addnew",(req,res)=>{
    var cropid = req.body.cropid;
    var cropname = req.body.cropname;
    var cropcost = req.body.cropcost;
    connection.query("insert into dist1 values ("+cropid+",'"+cropname+"',"+cropcost+")",
    (err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send("success");
        }
    })
});
router.post("/distcrop/edit/:id",(req,res)=>{
    var cropid = req.params.id;
    var cropname = req.body.cropname;
    var cropcost = req.body.cropcost;
    connection.query("update dist1 set cropname='"+cropname+"',cropcost="+cropcost+" where cropid="+cropid+"",
    (err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send("success");
        }
    })
});
router.get("/distcrop/delete/:id",(req,res)=>{
    var cropid = req.params.id;
    connection.query("delete from dist1 where cropid="+cropid+"",
    (err,result)=>{
        if(err)
        {
           return  res.send("You cant delete it , but you can update it because it is already in use in talukas");
        }
        else
        {
            return res.send("successfully deleted");
        }
    })
})


module.exports = router;