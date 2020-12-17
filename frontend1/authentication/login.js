var otp;
var idd;
function forgotpass()
{
    document.getElementById("changepassword").style.display = "block";
    document.getElementById("first").style.display = "none";
}
//district form open here
function dis()
{
   document.getElementById("dis").style.display="block";
   document.getElementById("first").style.display="none";
   
}


//taluk form open here
function tal()
{
   document.getElementById("tal").style.display="block";
   document.getElementById("first").style.display="none";
   
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
    localStorage.setItem("tn",talukno);
    postData("http://localhost:8080/auth/logint", {username:username,password:password,talukno:talukno})
    .then(data => {
            document.getElementById("dontshow").value = data.name;
            var pp = document.getElementById("dontshow").value;
            alert(pp);
            if(pp ==="success")
            {
               location.assign("http://localhost:8080/work.html");
            }
    })
    .catch((error)=>{
        document.write(error)
    })
}
function work()
{
    var ppp = localStorage.getItem("tn");
    postData("http://localhost:8080/auth/currentedit", {id:ppp})
    .then(data=>{
        location.assign("http://localhost:8080/home.html")
    })
    .catch((error)=>{
        location.assign("http://localhost:8080/home.html")
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
