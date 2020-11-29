var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
var router = express.Router();


//view our taluk crops
router.get('/viewcrops/:id',(req,res)=>{
    var talukid = req.params.id;
    connection.query("select * from crop where talukno="+talukid+"", 
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
//Edit crop details like produce and requirements
router.post('/editcrops/:tid/:cid',(req,res)=>{
    var talukid = req.params.tid;
    var cropid  = req.params.cid;
    var pro = req.body.produce;
    var requ = req.body.requirement;
    connection.query("update crop set produce="+pro+", requirement="+requ+" where talukno="+talukid+" and cropno="+cropid+"", 
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

//view our taluk farmers
router.get('/viewfarmers/:id',(req,res)=>{
    var talukid = req.params.id;
    connection.query("select * from farmer where talukno="+talukid+"", 
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
//EDIT FARMER DETAILS
router.post('/editfarmer/:tid/:fid',(req,res)=>{
    var talukid = req.params.tid;
    var aadharno  = req.params.fid;
    var name = req.body.farmername;
    var accno = req.body.accountno;

    connection.query("update farmer set farmername='"+name+"', accountno="+accno+" where talukno="+talukid+" and aadharno="+aadharno+"", 
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
//
module.exports = router;