var tid;
var tname;
var username;
var sublist = [];
var list = [];
var megasublist = [];
var eachlist = [];
var megaeachsublist = [];
var crops = [];
var modal = document.getElementById("myModal");
var valbalance;

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

tid = localStorage.getItem("tn");
if(tid>0)
{
    document.getElementById("talukpage").style.display = "block";
}
ccc();
function ccc()
{ 
fetch(`http://localhost:8080/auth/getuserdetail/${tid}`)
.then(response => {
    return response.json();
})
.then(data=>{
    document.getElementById("talukname").innerHTML = tname = data[0].talukname;
    document.getElementById("username").innerHTML = username = data[0].username;
})
.catch((error)=>{
   res.send(error)
})
fetch(`http://localhost:8080/dist/distcrop/onlycrop`)
     .then(response => {
         return response.json();
     })
     .then(data => {
         for(var j=0;j<data.length;j++)
         {
             var temp =  `${data[j].cropname}`
             crops.push(temp);
         }
     })
     .catch((error)=>{
        console.log(error)
     })

     if(tid==0)
     {
         document.getElementById("login").style.display = "block";
     }
}
//Global post data function
async function postData(url = '', data = {})
  {
         const response = await fetch(url, {
             method: 'POST',
             mode :'cors',
             cache : 'no-cache',
             credentials: 'same-origin',
             headers: {
                 'Content-Type' : 'application/json'
             },
             body: JSON.stringify(data)
         });
         return response.json();
  }
function viewcrops()
{
    fetch(`http://localhost:8080/taluk/viewcrops/${tid}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        var smalllist = [];
        list = [];
        for(var j=0;j<data.length;j++)
        {
            //var temp =  `${data[j].cropid}   ${data[j].cropname}   ${data[j].produce}  ${data[j].requirement}`
            //list.push(temp);
             var temp = `${data[j].cropid}`;
             smalllist.push(temp);
             var temp = `${data[j].cropname}`;
             smalllist.push(temp);
             var temp = `${data[j].produce}`;
             smalllist.push(temp);
             var temp = `${data[j].requirement}`;
             smalllist.push(temp);
             var temp=`<button class="btn btn-danger" id="bt4" onclick="deletecrop(${data[j].cropid},${tid})">DELETE</button>`
             smalllist.push(temp)
             list.push(smalllist);
             smalllist = [];
        }
        viewcrops1();
    })
    .catch((error)=>{
       console.log(error)
    })
}
function viewcrops1()
{
           document.getElementById("view").innerHTML = "";
           var namelist = "<thead><tr> <th>cropid</th><th>cropname</th><th>production(kg)</th><th>requirements(kg)</th></tr></thead><tbody>";
           document.getElementById("view").innerHTML += namelist;
            for(var i=0;i<list.length;i++)
            {
                var namelist = "<tr> <td>"+ 
                list[i][0] +"</td><td>"+ 
                list[i][1] +"</td><td>"+
                list[i][2] +"</td><td>"+ 
                list[i][3] +"</td><td>"+
                list[i][4] +"</td></tr>";
                document.getElementById("view").innerHTML += namelist;
            }
            var namelist = "</tbody>"
            document.getElementById("view").innerHTML += namelist;
}
function deletecrop(cid,tid)
{
    fetch(`http://localhost:8080/taluk/viewcrops/deletecrop/${cid}/${tid}`)
    .then(response => {
        document.location.reload();
    })
}
function viewfarmers()
{
    fetch(`http://localhost:8080/taluk/viewfarmers/${tid}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        sublist = [];
        megasublist = [];
        for(var j=0;j<data.length;j++)
        {
            var temp =  `${data[j].aadharno}`   
            sublist.push(temp);
            var temp = `${data[j].farmername}` 
            sublist.push(temp);  
            var temp = `${data[j].accountno}`   
            sublist.push(temp);
            var temp = `${data[j].balance}`  
            sublist.push(temp);
            var temp = `${data[j].paid}`
            sublist.push(temp);
            var temp = `<button id="vvii" class="btn btn-info" onclick="farmerdetail(${data[j].aadharno})">view</button>`//view button
            sublist.push(temp);
            megasublist.push(sublist);
            sublist =[];
        }
        viewfarmers1();
        
    })
    .catch((error)=>{
       console.log(error)
    })  
}
function viewfarmers1()
     {
        document.getElementById("view").innerHTML = "";
         var namelist = "<tr> <th>aadharno</th><th>farmername</th><th>account no</th><th>balance</th><th>paid</th> </tr>";
         document.getElementById("view").innerHTML += namelist;
         for(var i=0;i<megasublist.length;i++)
         {
            var namelist = "<tr> <td>"+ 
                megasublist[i][0] +"</td><td>"+ 
                megasublist[i][1] +"</td><td>"+
                megasublist[i][2] +"</td><td>"+ 
                megasublist[i][3] +"</td><td>"+ 
                megasublist[i][4] +"</td><td>"+ 
                megasublist[i][5] +"</td></tr>";
            document.getElementById("view").innerHTML += namelist;
         }
         var namelist = "<br/></br></br>";
         document.getElementById("view").innerHTML += namelist;
         var namelist = "<tr><th id='myBtn' onclick='hh()'>ADD NEW FARMER</th></tr>";
         document.getElementById("view").innerHTML += namelist;
     }
function addbalance(ano)
{
    document.getElementById("addbalance").style.display = "block";
    document.getElementById('edit').style.display="none";
    document.getElementById("aa").value = ano;
    for(var i=0;i<crops.length;i++)
    {
        var temp = "<option>" + crops[i] + "</option>";
        document.getElementById("crp").innerHTML += temp;
    }

}
function addbalancevalue()
{
    var crp = document.getElementById("crp").value;
    localStorage.setItem("cpname",crp);
    var ano = document.getElementById("aa").value;
    var quant = document.getElementById("qq").value;
    fetch(`http://localhost:8080/taluk/addbalancetofarmer/${ano}/${crp}/${quant}/${tid}`)
     .then(response => {
         return response.json();
     })
     .then(data => {
        document.getElementById("second").innerHTML=""
        farmerdetail(ano);
     })
     .catch((error)=>{
        console.log(error)
     })
   
    sms(ano,quant,crp);
}

function croptouse(crp)
{
     postData(`http://localhost:8080/taluk/cropuse/${tid}/${crp}`,)
    .then(data => {
        alert("success");
    })
    .catch((error)=>{
       alert("done");
    })
}
function msg(ano,quant)
{
    alert(quant);
}
function payment(ano)
{
    var payu = prompt("Pay now , Enter rupee in text");
    fetch(`http://localhost:8080/taluk/payment/${ano}`)
     .then(response => {
         return response.json();
     })
     .then(data => {
        paymentnext(ano,payu,data[0].balance);  
     })
     .catch((error)=>{
        console.log(error)
     })
    
}
function paymentnext(ano,payu,balance)
{
    if(payu==null)
    {
        payu=0;
    }
    else if(payu>0 && payu<=balance)
    {
    fetch(`http://localhost:8080/taluk/payment/${ano}/${payu}`)
    .then(response => {
        return response;
    })
    .then(data => {
       // console.log("success")
       // document.getElementById("second").innerHTML=""
        document.location.reload();
        //farmerdetail(localStorage.getItem("idvalue"));
       // location.assign(`http://localhost:8080/taluk/viewfarmers/${tid}/${ano}`)
    })
    .catch((error)=>{
       console.log(error)
    })
    }
    else{
        alert("please verify once and redo")
    }
}
function editfarmer(ano,name,accno)
{
    document.getElementById("ad").value = ano;
    document.getElementById("fn").value = name;
    document.getElementById("ac").value = accno;
    document.getElementById("edit").style.display = "block"
    document.getElementById('addbalance').style.display="none";
}
function editing()
{
    var ad = document.getElementById("ad").value
    var fn = document.getElementById("fn").value
    var ac = document.getElementById("ac").value
    postData(`http://localhost:8080/taluk/editfarmer/${tid}/${ad}`, {farmername:fn,accountno:ac})
    .then(data => {
        console.log("success")
    })
    .catch((error)=>{
        console.log(error);
    })
}
function farmerdetail(id)
{
    localStorage.setItem("idvalue",id);
    /* document.getElementById("firstdisplay").style.display = "none";
     document.getElementById("second").style.display = "block"
     fetch(`http://localhost:8080/taluk/viewfarmers/${tid}/${id}`)
     .then(res=>{
         return res.json();
     })
     .then(data=>{
        for(var j=0;j<data.length;j++)
         {
            var temp =  `${data[j].aadharno}`   
            eachlist.push(temp);
            var temp = `${data[j].farmername}` 
            eachlist.push(temp);  
            var temp = `${data[j].accountno}`   
            eachlist.push(temp);
            var temp = `${data[j].balance}`  
            eachlist.push(temp);
            var temp = `${data[j].paid}`
            eachlist.push(temp);
            var namelist = "<tr> <th>aadharno</th><th>farmername</th><th>account no</th><th>balance</th><th>paid</th> </tr>";
            document.getElementById("second").innerHTML += namelist;
            var namelist = "<tr> <td>"+ 
            eachlist[0] +"</td><td>"+ 
            eachlist[1] +"</td><td>"+
            eachlist[2] +"</td><td>"+ 
            eachlist[3] +"</td><td>"+ 
            eachlist[4] +"</td></tr>";
        document.getElementById("second").innerHTML += namelist;
             var namelist = "<br/><br/>";
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="addbalance(${data[j].aadharno})">add balance</button>`;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="payment(${data[j].aadharno})">PAY</button>`;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="editfarmer(${data[j].aadharno},'${data[j].farmername}',${data[j].accountno})">EDIT</button>`;
             document.getElementById("second").innerHTML += namelist;
         }
     })*/
     location.assign("http://localhost:8080/homeview.html");
}
function cd()
{
    document.getElementById("second").innerHTML = "";
    document.getElementById("cd").style.display = "none";
    var id = localStorage.getItem("idvalue");
    document.getElementById("openclose").style.display = "block";
     document.getElementById("second").style.display = "block"
     fetch(`http://localhost:8080/taluk/viewfarmers/${tid}/${id}`)
     .then(res=>{
         return res.json();
     })
     .then(data=>{
        for(var j=0;j<data.length;j++)
         {
            var temp =  `${data[j].aadharno}`   
            eachlist.push(temp);
            var temp = `${data[j].farmername}` 
            eachlist.push(temp);  
            var temp = `${data[j].accountno}`   
            eachlist.push(temp);
            var temp = `${data[j].balance}`  
            eachlist.push(temp);
            var temp = `${data[j].paid}`
            eachlist.push(temp);
            var namelist = "<tr> <th>aadharno</th><th>farmername</th><th>account no</th><th>balance</th><th>paid</th> </tr>";
            document.getElementById("second").innerHTML += namelist;
            var namelist = "<tr> <td>"+ 
            eachlist[0] +"</td><td>"+ 
            eachlist[1] +"</td><td>"+
            eachlist[2] +"</td><td>"+ 
            eachlist[3] +"</td><td>"+ 
            eachlist[4] +"</td></tr>";
        document.getElementById("second").innerHTML += namelist;
             var namelist = "<br/><br/>";
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button class="btn btn-lg btn-primary" onclick="addbalance(${data[j].aadharno})">add balance</button>   `;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button class="btn btn-lg btn-primary" onclick="payment(${data[j].aadharno})">PAY</button>   `;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button class="btn btn-lg btn-primary" onclick="editfarmer(${data[j].aadharno},'${data[j].farmername}',${data[j].accountno})">EDIT</button>`;
             document.getElementById("second").innerHTML += namelist;
         }
     })
}
function logout()
{
    delete localStorage.tn;
    location.assign("http://localhost:8080/login.html");
}
function login()
{
    location.assign("http://localhost:8080/login.html");
}
function addfarmer()
{
    var ad = document.getElementById("aadh").value
    var fn = document.getElementById("faname").value
    var ac = document.getElementById("acnumber").value
    postData(`http://localhost:8080/taluk/addfarmer/${tid}/${ad}`, {farmername:fn,accountno:ac})
    .then(data => {
        console.log("success")
    })
    .catch((error)=>{
        console.log(error);
    })
}
//getnumber confirm
function sms(ano,quant,crp)
{
    fetch(`http://localhost:8080/taluk/sms/${crp}/${quant}/${ano}`)
    .then(res =>{
       alert("on way success");
    })
    .catch((error)=>{
       alert("first way success");
    })
    croptouse(crp);
}
// When the user clicks the button, open the modal 
function hh() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


