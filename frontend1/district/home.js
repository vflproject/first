var list = [];
var sublist = [];
var cropslist = [];
fetch("http://localhost:8080/dist/viewtalukas")
     .then(response=>{
        return response.json()
     })
     .then(data=>{
         console.log(data.length)
         for(var j=0;j<data.length;j++)
         {
             var temp = `${data[j].talukname} <button onclick="talukdetail(${data[j].talukid})">view</button>`
             list.push(temp);
         }
})
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
//taluk detail view
function detailview()
  {
         document.getElementById("detail").innerHTML="";
         for(var i=0;i<sublist.length;i++)
         {
             var namelist = "<li>" +sublist[i]+  "</li>";
             document.getElementById("detail").innerHTML += namelist;
         }
  }
//taluk detail fetch
function talukdetail(id1){
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
//taluk view
function viewtalukas(){
    document.getElementById("name").innerHTML = "";
    for(var i=0;i<list.length;i++)
    {
        var namelist = "<li>" +list[i]+  "</li>";
        document.getElementById("name").innerHTML += namelist;
    }
    var ff = document.getElementById("ff");
    ff.style.display = "block";
}
//crops details view
function distcrops(){
    document.getElementById("name").innerHTML = "";
    document.getElementById("detail").innerHTML = "";
    for(var i=0;i<cropslist.length;i++)
    {
        var namelist = "<li>" +cropslist[i]+  "</li>";
        document.getElementById("name").innerHTML += namelist;
    }
    var temp = `<button onclick="cropinsertform()">ADD NEW</button>`;
    document.getElementById("name").innerHTML += temp;
    var ff = document.getElementById("ff");
    ff.style.display = "block";
}
//cropinsert form
function cropinsertform(){
    var addcrop = document.getElementById("addcrop");
    addcrop.style.display = "block";
}

//delete crops
function deleteone(id1){
    fetch(`http://localhost:8080/dist/distcrop/delete/${id1}`)
     .then(response => {
         return response;
     })
     .then(data => {
        window.location = "../district/home.html"
     })
     .catch((error)=>{
        window.location = "../district/home.html";
     })
 }
//insert new crop
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
//EDIT PART
 function EDIT(id,name,cost)
{
    document.getElementById("cropid1").value=id;
    document.getElementById("cropname1").value=name;
    document.getElementById("cropcost1").value=cost;
    var editcrop = document.getElementById("editcrop");
    editcrop.style.display = "block";
}
 //editing part
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