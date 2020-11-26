import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import HOMED from './components/homed';

import LOGIN from './components/login'

function App() {

  return (
    <Router>
    <div className="App">
  
    <Switch>
         <Route path = "/" exact component = {LOGIN} />
         <Route path = "/homed" component= {HOMED}/>
    </Switch>
    </div>
    </Router>
  );
}


export default App;