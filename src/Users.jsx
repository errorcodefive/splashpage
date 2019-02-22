import React from 'react';
import ReactDOM from 'react-dom';

var contentNode = document.getElementById('loginSystem');

class Login extends Component{
    constructor (props){
        super(props);

        this.state={
            token: '',
            signUpError: '',
            SignInError: '',
            signInEmail: '',
            signInPassword: '',
            signUpEmail: '',
            signUpPassword: ''
        };
    }
}