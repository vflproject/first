var tnumber = 0; // this variable will help later at that ill update inform here where it used


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


//district officer detail fetch
function logindatas(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    fetch("http://localhost:8080/auth/login", {username:username,password:password})
    .then(data => {
            window.location = "../district/home.html"
    })
    .catch((error)=>{
        console.log(error);
    })
}


//taluk officer detail fetch
function logindatastaluk(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var talukno = document.getElementById("tno").value;
    tnumber = talukno;
    
    fetch("http://localhost:8080/auth/logint", {username:username,password:password,talukno:talukno})
    .then(data => {
            window.location = "../taluk/home.html"
    })
    .catch((error)=>{
        console.log(error);
    })
}