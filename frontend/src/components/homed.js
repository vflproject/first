import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import './homed.css'
class HOMED  extends React.Component {
state = {
    data : this.props.data,
    list : [],
    sublist : [],
} 
componentDidMount() {
  axios.get("http://localhost:8080/dist/viewtalukas")
  .then(res=> {
    const list = res.data;
    this.setState({
      list:list
    })
  })
}
handletalukaslist(){
   var view = document.getElementById("view");
   view.style.display = "block";
}
talukdetail(vp) {
  const user = {
     talukid : vp,
  }
  axios.post("http://localhost:8080/dist/talukdetail",user)
  .then(res=> {
    const sublist = res.data;
    this.setState({
      sublist:sublist
    })
  })
  
}
lstv(){
  return(
  <ul>
      {this.state.sublist.map(person => 
        <li>{person.cropid} {person.cropname} {person.produce} {person.requirement}</li>)}
  </ul>
  )
}

render() {
  return (
    <div>
         <h1>Welcome to homepage  {this.state.data}</h1>
         <button onClick={this.handletalukaslist}>view talukas list</button>
         <div id="view">
         <ul>
                      
                      {this.state.list.map((item,ind) => <ol key={ind}>
                           
                                <Collapsible trigger={<div >{item.talukname}</div>}>
                                  <div>
                                      <button onClick={this.talukdetail(item.talukid)}>Taluk detail {item.talukname}</button>
                                  </div>
                                  
                               </Collapsible> 
                              <br /> 
                          
                      </ol>)}
                        
         </ul>
         </div>
           
    </div>
  );
}
}

export default HOMED;
