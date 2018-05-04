import React from 'react';
class Login extends React.Component{

	render(){
		return(
			<button onClick={this.handleClick}>BUTTON</button>
			);
	}	
}
ReactDOM.render(<Login />, 
	document.getElementById('root')
);