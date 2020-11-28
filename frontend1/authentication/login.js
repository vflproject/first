
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