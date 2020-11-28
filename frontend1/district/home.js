var list = [];
var sublist = [];

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
function detailview()
  {
         document.getElementById("detail").innerHTML="";
         for(var i=0;i<sublist.length;i++)
         {
             var namelist = "<li>" +sublist[i]+  "</li>";
             document.getElementById("detail").innerHTML += namelist;
         }
  }
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