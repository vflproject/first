var tid = 1;
var list = [];
var sublist = [];
var eachlist = [];
var crops = [];
fetch(`http://localhost:8080/taluk/viewcrops/${tid}`)
     .then(response => {
         return response.json();
     })
     .then(data => {
         for(var j=0;j<data.length;j++)
         {
             var temp =  `${data[j].cropid}   ${data[j].cropname}   ${data[j].produce}  ${data[j].requirement}`
             list.push(temp);
         }
     })
     .catch((error)=>{
        console.log(error)
     })
fetch(`http://localhost:8080/taluk/viewfarmers/${tid}`)
     .then(response => {
         return response.json();
     })
     .then(data => {
         
         for(var j=0;j<data.length;j++)
         {
             var temp =  `${data[j].aadharno}   ${data[j].farmername}   ${data[j].accountno}    ${data[j].balance}  ${data[j].paid}  <button onclick="farmerdetail(${data[j].aadharno})">view</button>`
             sublist.push(temp);
         }
     })
     .catch((error)=>{
        console.log(error)
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
function viewcrops()
     {
            document.getElementById("view").innerHTML="";
            for(var i=0;i<list.length;i++)
            {
                var namelist = "<li>" +list[i]+  "</li>";
                document.getElementById("view").innerHTML += namelist;
            }
     }
function viewfarmers()
     {
         document.getElementById("view").innerHTML="";
         for(var i=0;i<sublist.length;i++)
         {
             var namelist = "<li>" +sublist[i]+  "</li>";
             document.getElementById("view").innerHTML += namelist;
         }
     }
function addbalance(ano)
{
    var ab = document.getElementById("addbalance").style.display = "block";
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
        console.log("success")
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
function editfarmer()
{

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
        var temp = `aadharno  farmername  accountno  balance  paid`;
        var namelist = "<li>" +temp+  "</li>";
        for(var j=0;j<data.length;j++)
         {
             var temp =  `${data[j].aadharno}   ${data[j].farmername}   ${data[j].accountno}  ${data[j].balance} ${data[j].paid}`
             var namelist = "<li>" +temp+  "</li>";
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="addbalance(${data[j].aadharno})">add balance</button>`;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="payment(${data[j].aadharno})">PAY</button>`;
             document.getElementById("second").innerHTML += namelist;
             var namelist = `<button onclick="editfarmer(${data[j].aadharno})">EDIT</button>`;
             document.getElementById("second").innerHTML += namelist;
         }
     })
}
