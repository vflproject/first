import React from 'react';
import axios from 'axios';
import HOMED from './homed';
import { BrowserRouter as Router, withRouter, Redirect} from "react-router-dom";

class LOGIN  extends React.Component {
  state = {
      username : "",
      password : "",
      pp : "invalid username",
      redirect : false,
  }
  handleChangeusername = event => {
    this.setState({
      username :event.target.value
    });
  }
  handleChangepassword = event => {
    this.setState({
      password : event.target.value
    });
  }
  handleSubmit = event => {
   event.preventDefault();
    const user = {
      username : this.state.username,
      password : this.state.password
    };
    axios.post(`http://localhost:8080/auth/login`, user)
    .then(res=>{
        if(res.data === "success"){
        this.setState({
            pp : this.state.username,
            redirect : true
        })}
        else{
            this.setState({
                redirect:true
            })
        }
    })
  }

render() {
  const {redirect} = this.state;
  if(redirect)
  {
      return <HOMED data={this.state.pp}/>
  }
  return (
    <div>
         <form onSubmit={this.handleSubmit}>
           <label> username  : <input type="text" name="username" onChange={this.handleChangeusername}></input></label>
           <label>passwword  : <input type="password" name="password" onChange={this.handleChangepassword}></input></label>
           <button type="submit">LOGIN</button>
    
         </form>
    </div>
  );
}
}

export default withRouter (LOGIN);
