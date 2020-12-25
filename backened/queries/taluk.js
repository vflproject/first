var con = require('../connection');
var connection = con.getConnection();
connection.connect();
var express = require('express');
var router = express.Router();


//view our taluk crops
router.get('/viewcrops/:id',(req,res)=>{
    var talukid = req.params.id;
    connection.query("select cropid,cropname,produce,requirement from crop,dist1 where cropid=cropno and talukno like "+talukid+"", 
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


//view a single farmer based on aadhar number
router.get('/viewfarmers/:id1/:id2',(req,res)=>{
    var talukid = req.params.id1;
    var aadharno = req.params.id2;
    connection.query("select * from farmer where talukno="+talukid+" and aadharno="+aadharno+"", 
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
//add farmer
router.post('/addfarmer/:tid/:fid',(req,res)=>{
    var talukid = req.params.tid;
    var aadharno  = req.params.fid;
    var name = req.body.farmername;
    var accno = req.body.accountno;

    connection.query("insert into farmer (talukno,aadharno,farmername,accountno) values("+talukid+","+aadharno+",'"+name+"',"+accno+")", 
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
//add balance
router.get('/addbalancetofarmer/:id1/:id2/:id3',(req,res)=>{
    var cropname = req.params.id2;
    var aadharno = req.params.id1;
    var quant = req.params.id3;
    /*
     delimiter //
mysql> create procedure addbalance(name varchar(20), aadhar int, quantitude int)
    -> begin
    -> update farmer set balance=balance+(select (cropcost*quantitude) from dist1 where cropname=name) where aadharno=aadhar;
    -> end //
    */
    connection.query("call addbalance('"+cropname+"',"+aadharno+","+quant+")", 
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
router.post('/cropuse/:id1/:id2',(req,res)=>{
    var talukno = req.params.id1;
    var cropname = req.params.id2;
    connection.query("insert into crop (talukno,cropno) values ("+talukno+", (select cropid from dist1 where cropname='"+cropname+"'));",
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
router.get('/payment/:id1/:id2',(req,res)=>{
    var aadharno = req.params.id1;
    var payu = req.params.id2;
    /*
     create procedure editmoney(aadhar int, payu int)
    -> begin
    -> update farmer set balance = balance-payu where aadharno=aadhar;
    -> update farmer set paid = paid+payu where aadharno=aadhar;
    -> end
    -> //
    */
    connection.query("call editmoney("+aadharno+","+payu+")",
    (err,result)=>{
        if(result)
        {
        res.send("success") 
        }
        else{
            res.send(err);
        }
    });
})
router.get('/payment/:id1',(req,res)=>{
    var aadharno = req.params.id1;
    connection.query("select balance from farmer where aadharno=14",
    (err,result)=>{
        if(result)
        {
         res.send(result);
        }
        else{
            res.send(err);
        }
    });
})
module.exports = router;