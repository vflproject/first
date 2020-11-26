import React from 'react';

class HOMED  extends React.Component {
state = {
    data : this.props.data,
} 
render() {
  return (
    <div>
         <h1>Welcome to homepage  {this.state.data}</h1>
    </div>
  );
}
}

export default HOMED;
