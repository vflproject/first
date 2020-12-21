
var tid=3;
var sublist = [];
var list = [];
var megasublist = [];
var eachlist = [];
var megaeachsublist = [];
var crops = [];
var otp;
var idd;

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
        list = [];
        for(var j=0;j<data.length;j++)
        {
            var temp =  `${data[j].cropid}   ${data[j].cropname}   ${data[j].produce}  ${data[j].requirement}`
            list.push(temp);
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
            for(var i=0;i<list.length;i++)
            {
                var namelist = "<li>" +list[i]+  "</li>";
                document.getElementById("view").innerHTML += namelist;
            }
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
            var temp = `<button onclick="farmerdetail(${data[j].aadharno})">view</button>`
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
     }
function addbalance(ano)
{
    document.getElementById("addbalance").style.display = "block";
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
    var ano = document.getElementById("aa").value;
    var quant = document.getElementById("qq").value;
    fetch(`http://localhost:8080/taluk/addbalancetofarmer/${ano}/${crp}/${quant}`)
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
}
function payment(ano)
{
    var payu = prompt("Pay now , Enter rupee in text");
    fetch(`http://localhost:8080/taluk/payment/${ano}/${payu}`)
     .then(response => {
         return response;
     })
     .then(data => {
        console.log("success")
        document.getElementById("second").innerHTML=""
        farmerdetail(ano);
     })
     .catch((error)=>{
        console.log(error)
     })
}

function editfarmer(ano,name,accno)
{
    document.getElementById("ad").value = ano;
    document.getElementById("fn").value = name;
    document.getElementById("ac").value = accno;
    document.getElementById("edit").style.display = "block"
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
     document.getElementById("firstdisplay").style.display = "none";
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

             var namelist = `<button onclick="addbalance(${data[j].aadharno})">add balance</button>`;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="payment(${data[j].aadharno})">PAY</button>`;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="editfarmer(${data[j].aadharno},'${data[j].farmername}',${data[j].accountno})">EDIT</button>`;
             document.getElementById("second").innerHTML += namelist;
         }
     })
}
function dd()
{
    alert(tid);
}

function dis()
{
   document.getElementById("dis").style.display="block";
   document.getElementById("first").style.display="none";
   document.getElementById("changepassword").style.display="block";
}


//taluk form open here
function tal()
{
   document.getElementById("tal").style.display="block";
   document.getElementById("first").style.display="none";
   document.getElementById("changepassword").style.display="block";
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

//district officer detail fetch
function logindatas(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    postData("http://localhost:8080/auth/login", {username:username,password:password})
    .then(data => {
            location.assign("http://localhost:8080/homed.html");
    })
    .catch((error)=>{
        console.log(error);
    })
}


//taluk officer detail fetch
function logindatastaluk(){
    var username = document.getElementById("usernamet").value;
    var password = document.getElementById("passwordt").value;
    var talukno = document.getElementById("tno").value;
    tid = talukno;
    postData("http://localhost:8080/auth/logint", {username:username,password:password,talukno:talukno})
    .then(data => {
            document.getElementById("dontshow").value = data.name;
            var pp = document.getElementById("dontshow").value;
            alert(pp);
            if(pp ==="success")
            {
                location.assign("http://localhost:8080/home.html")
            }
    })
    .catch((error)=>{
        document.write(error)
    })
}
function takemail()
{
    var id = document.getElementById("who").value;
    idd = parseInt(id);
    postData("http://localhost:8080/auth/loginmail", {idd:idd})
    .then(data => {
        sendEmail(data[0].email)
    })
}
function sendEmail(mm) { 
	otp=makeid(6);
	Email.send({ 
		Host: "smtp.gmail.com", 
		Username: "vocalforlocalteam@gmail.com", 
		Password: "vocal@local", 
		To: mm, 
		From: "vocalforlocalteam@gmail.com", 
		Subject: "We are fron vocal for local team we give a permission to change your password ", 
		Body: "Hi, Enter this OTP in block then it give a permission to change password  "+"OTP :   " + otp, 
	}) 
		.then(function (message) { 
		var ot = prompt("Enter otp");	
		if(ot===otp)
        {
         alert("success")
         document.getElementById("pass").style.display="block";
        }
		else
		{
         alert("fail")
        }
		}); 
} 
    
function makeid(length)
{
    var res = '';
    var characters = 'abcdefg@#$1234567890ABCDF';
    var charlength = characters.length;
    for(var i=0;i<length;i++)
    {
        res += characters.charAt(Math.floor(Math.random()*charlength));
    }
    return res;
}
function refresh()
{
    location.assign("http://localhost:8080/login.html");
}
function passchange()
{
    var pl = document.getElementById("pa").value;
    postData("http://localhost:8080/auth/loginedit", {password:pl,tno:idd})
    .then(
       
    )
}
