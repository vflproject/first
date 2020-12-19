var list = [];
var sublist = [];
var cropslist = [];
var idlist = [];
var finalview = [];
var b=0;
var did;
//here all taluk list fetching

fetch(`http://localhost:8080/auth/getuser`)
.then(response => {
    return response.json();
})
.then(data=>{
     var vv = data[0].number;
     localStorage.setItem("tt",vv);
     cchn();
})

function cchn()
{
    did = localStorage.getItem("tt");
    alert(did);
    if(did==-1)
{
fetch("http://localhost:8080/auth/getbydist")
   .then(response=>{
       return response.json();
   })
   .then(data=>{
       document.getElementById("username").innerHTML = data[0].username;
   })
fetch("http://localhost:8080/dist/viewtalukas")
     .then(response=>{
        return response.json()
     })
     .then(data=>{
         console.log(data.length)
         for(var j=0;j<data.length;j++)
         {
             var temp = `${data[j].talukname}`
             idlist.push(data[j].talukid)
             list.push(temp);
         }
         hh();
}
)
//here our districts all crops fetching
fetch("http://localhost:8080/dist/distcrop")
     .then(response=>{
        return response.json()
     })
     .then(data=>{
         console.log(data.length)
         for(var j=0;j<data.length;j++)
         {
             var temp =  `${data[j].cropid}   ${data[j].cropname}   ${data[j].cropcost} <button onclick='EDIT(${data[j].cropid}, "${data[j].cropname}", ${data[j].cropcost})'>edit</button> <button onclick="deleteone(${data[j].cropid})">delete</button> `
             cropslist.push(temp);
         }
})
}
}

function hh()
{
    for(var d=0;d<idlist.length;d++)
    {
    var id1 = idlist[d];
    postData("http://localhost:8080/dist/talukdetail", {talukid:id1})
    .then(data => {
        sublist = [];
        for(var j=0;j<data.length;j++)
        {
            var temp = `${data[j].cropid}   ${data[j].cropname}   ${data[j].produce}kg   ${data[j].requirement}kg`
            sublist.push(temp);
        }
        detailview();
    })
    .catch((error)=>{
        console.log(error);
    })
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


//taluk detail view html editor function
function detailview()
  {
         document.getElementById("detail").innerHTML="";
         var ppp = "";
         for(var i=0;i<sublist.length;i++)
         {
             ppp += "<li>" +sublist[i]+  "</li>";
         }
         finalview[b++] = ppp;
  }


//taluk view in html page function
function viewtalukas(){
    document.getElementById("ff").innerHTML = "";
    document.getElementById("edd").style.display = "none";
    for(var i=0;i<list.length;i++)
    {
        var namelist = "<div class='collapsible'>" +list[i]+  "</div>";
        document.getElementById("ff").innerHTML += namelist;
        var name1list = `<div class='content'>` + finalview[i] +  `</div>`;
        document.getElementById("ff").innerHTML += name1list;
    }
    var ff = document.getElementById("ff");
    ff.style.display = "block";
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
    content.style.display = "none";
    } else {
    content.style.display = "block";
    }
    });
    }
}


//crops details view in html page function
function distcrops(){
    document.getElementById("ff").innerHTML = "";
    document.getElementById("detail").innerHTML = "";
    for(var i=0;i<cropslist.length;i++)
    {
        var namelist = "<li>" +cropslist[i]+  "</li>";
        document.getElementById("ff").innerHTML += namelist;
    }
    var temp = `<button onclick="cropinsertform()">ADD NEW</button>`;
    document.getElementById("ff").innerHTML += temp;
    var ff = document.getElementById("ff");
    ff.style.display = "block";
}


//cropinsert form open here
function cropinsertform(){
    var addcrop = document.getElementById("addcrop");
    addcrop.style.display = "block";
}


//insert new crop here with backened 
function cropinsert(){
    var cid = document.getElementById("cropid").value;
    var cname = document.getElementById("cropname").value;
    var ccost = document.getElementById("cropcost").value;
    postData("http://localhost:8080/dist/distcrop/addnew", {cropid:cid, cropname:cname, cropcost:ccost})
     .then(data => {
        var addcrop = document.getElementById("addcrop");
        addcrop.style.display = "none";
        
     })
     .catch((error)=>{
         console.log(error);
     })
 }


//delete crops with backened
function deleteone(id1){
    fetch(`http://localhost:8080/dist/distcrop/delete/${id1}`)
     .then(response => {
         return response;
     })
     .then(data => {
        location.assign("http://localhost:8080/homed.html")
     })
     .catch((error)=>{
        location.assign("http://localhost:8080/homed.html")
     })
 }


//EDIT PART and form open here
 function EDIT(id,name,cost)
{
    document.getElementById("edd").style.display = "block";
    document.getElementById("cropid1").value=id;
    document.getElementById("cropname1").value=name;
    document.getElementById("cropcost1").value=cost;
    var editcrop = document.getElementById("editcrop");
    editcrop.style.display = "block";
}


 //editing part fetch and post here
 function cropedit(){
    var cid = document.getElementById("cropid1").value;
    var cname = document.getElementById("cropname1").value;
    var ccost = document.getElementById("cropcost1").value;
    postData(`http://localhost:8080/dist/distcrop/edit/${cid}`, {cropname:cname, cropcost:ccost})
     .then(data => {
        var addcrop = document.getElementById("addcrop");
        addcrop.style.display = "none";
     })
     .catch((error)=>{
         console.log(error);
     })
 }
 function login()
{
    location.assign("http://localhost:8080/login.html");
}
function logout()
{
    postData("http://localhost:8080/auth/currentedit", {id:0})
    .then(data=>{
        location.assign("http://localhost:8080/login.html");  
    })
    .catch((error)=>{
        // document.getElementById("openclose").style.display = "none";
        //  document.getElementById("login").style.display = "block";
        //  document.getElementById("logout").style.display = "none";
        location.assign("http://localhost:8080/login.html");

    })
}

