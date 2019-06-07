import React from 'react';
import ReactDOM from 'react-dom';

var contentNode = document.getElementById('loginMain');

class LoginMain extends React.Component{
    constructor (){
        super();
    }
    render(){
        return(
            <div>
                <LoginForm/>
            </div>
        );
    }
}
class LoginForm extends React.Component{
    constructor(){
        super();
        this.state={
            password: '',
            username: ''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.findUser=this.findUser.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        //after submit is clicked then get user information based on username
        console.log("Username: " + this.refs.username.value);
        console.log("Password: " + this.refs.password.value);
        findUser({
            username: this.refs.username.value,
            password: this.refs.password.value
        });
    }
    handleChange(event){
        this.setState({
            username: event.target.username,
            password: event.target.password
        })
    }
    findUser(userInfo){
        fetch('/api/users/signin',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(userInfo)
        }).then(response=>response.json()
        ).then(response=>{
            console.log("HERE:" + JSON.stringify(response));
        }).catch(err=>{
            console.log("Error sending data to server: " + err.message);
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input type="text" ref="username"/>
                <label>Password:</label>
                <input type="text" ref="password"/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

ReactDOM.render(<LoginMain />, contentNode);
export default LoginMain;