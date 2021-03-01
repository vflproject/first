var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
var router = express.Router();


//taluka views
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


//view taluks fund
router.get('/viewtalukasfund',(req,res)=>{
    connection.query("select talukname,talukfund from taluka",
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


//each taluk detail
router.post('/talukdetail',(req,res)=>{
    var talukid = req.body.talukid;
    connection.query(" select cropid,cropname,produce,requirement,talukno from dist1,crop where cropno=cropid and talukno="+talukid+"",
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


//edit crop produce & requirements
router.get('/edit/:idt/:idc/:pro/:requ', (req,res)=>{
    var idt = req.params.idt;
    var idc = req.params.idc;
    var pro = req.params.pro;
    var requ = req.params.requ;
    connection.query("update crop set produce="+pro+", requirement="+requ+" where talukno="+idt+" and cropno="+idc+"",
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


//all crops list in district
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


//It is to verify the cropname and comparing with given content
//view 
/*
create view croplist AS
    -> select cropname
    -> from dist1;
*/
router.get("/distcrop/onlycrop",(req,res)=>{
    connection.query("select * from croplist",
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


//new crop add
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


//edit crop
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


//delete crop
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


//add money to taluk fund
router.get("/talukfundpay/:id/:v",(req,res)=>{
    var id=req.params.id
    var v = req.params.v
    connection.query("update taluka set talukfund=talukfund-"+v+" where talukid="+id+"",
    (err,result)=>{
        if(err)
        {
            return res.send("error");
        }
        else{
            return res.send("paid");
        }
    })
})

module.exports = router;