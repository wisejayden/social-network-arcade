import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import TypeWriter from 'react-typewriter';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            emptyEmail: false,
            emptyPassword: false,
            email: true,
            password: '',
            userInputValue: '',
            incorrectPassword: false
        };
        this.setFieldValue = this.setFieldValue.bind(this);
        this.submit = this.submit.bind(this);
        this.focustextInput = this.focusTextInput.bind(this);
        this.findFieldValue = this.findFieldValue.bind(this);
    }
    setFieldValue(e) {
        var self = this;
        if(e.keyCode == 13) {
            if(e.target.name == 'email'){
                if(!e.target.value.length) {
                    this.setState({
                        emptyEmail: true
                    })
                } else {
                    this[e.target.name] = e.target.value;
                    this.setState({email: false, password: true, userInputValue: ''}, function() {
                        self.focusTextInput();
                    })
                }
            }
            if(e.target.name == 'password') {
                if(!e.target.value.length) {
                    this.setState({
                        emptyPassword: true
                    })
                } else {
                    this[e.target.name] = e.target.value;
                    this.setState({
                        password: false,
                        userInputValue: ''

                    });
                    this.submit();
                }
            }


        }
    }
    findFieldValue(e) {
        this.setState({
            userInputValue: e.target.value
        })
    }
    focusTextInput() {
        this.textInput.focus();
    }
    submit() {
        axios.post('/login', {
            email: this.email,
            password: this.password
        })
            .then((res) => {
                if(res.data.success) {
                    location.replace('/');
                } else {

                    if(res.data.reason == 'Password incorrect') {
                        this.setState({
                            password: true,
                            incorrectPassword: true
                        }, function(){
                            this.focusTextInput();
                        });
                    } else if (res.data.reason == 'Wrong email') {
                        this.setState({
                            incorrectEmail: true,
                            email: true
                        }, function(){
                            this.focusTextInput();
                        });
                    } else if (res.data.reason == 'No password') {
                        this.setState({
                            error: 'Please enter a password'
                        })
                    }
                }

        })
            .catch((err)=> {
                console.log(err);
            })
    }
    componentDidMount() {
        this.focusTextInput();

        var self = this;
        window.addEventListener("keydown", function(e) {
            if(e.key == "Escape") {
                if(self.state.password === true) {
                    self.setState({
                        password: false,
                        email: true
                    }, function(){
                        self.focusTextInput();
                    })
                }
                if(self.state.email === true) {
                    location.replace('/welcome#/');
                    // self.props.activateIntroScreen();
                    ///go back to welcome screen!
                }
            }
            if(e.key == "Tab") {
                self.focusTextInput();
            }
        })
        var el = document.getElementsByClassName('intro-inputs');
        document.addEventListener('click', function() {
            self.textInput.focus();
        })
    }
    render() {
        const errorMessage = {color: 'red'}
        return(
            <div className="register-screen">
                <Link to="/"><button id="forgot-register" type="button" name="forgot-register">go back</button></Link>
            <button id="quit-game" type="button" name="quit" onClick={this.quit}>Quit</button>


                <div className="greeting">
                    {this.state.email &&
                        <div className="message-caption">
                        <div>
                        {!this.state.emptyEmail && !this.state.incorrectEmail &&
                                <TypeWriter className="question" typing={1}>Great to see you back! What is your email address again??</TypeWriter>
                            }

                            {this.state.emptyEmail &&
                                <TypeWriter className="question errormessage" typing={2}>Did you forget? Maybe you should <Link to="/"><button id="error-register-button" type="button" name="forgot-register">register?</button></Link></TypeWriter>
                            }
                            {this.state.incorrectEmail &&
                                <TypeWriter className="question errormessage" typing={2}>Your email doesn't match... try again?</TypeWriter>
                            }
                        </div>
                        <div className="input">
                            <p className="user-input">{this.state.userInputValue}</p>
                            <input className="intro-inputs" type="text" ref={(input) => { this.textInput = input; }} name="email" placeholder="Email Address" onChange={this.findFieldValue} onKeyDown={this.setFieldValue} />
                        </div>
                        </div>
                    }

                    {this.state.password &&
                        <div className="message-caption">
                            <div>
                                {!this.state.emptyPassword && !this.state.incorrectPassword &&
                                    <TypeWriter typing={1}>Password baby?</TypeWriter>
                                }
                                {this.state.emptyPassword &&
                                    <TypeWriter className="question errormessage" typing={2}>Oh C'mon, you need to login somehow.</TypeWriter>
                                }
                                {this.state.incorrectPassword &&
                                    <TypeWriter className="question errormessage" typing={2}>! ACCESS DENIED ! <br/>Seems like it's the wrong password.. </TypeWriter>
                                }
                            </div>
                            <div className="input">
                                <p className="user-input">{this.state.userInputValue}</p>
                                <input className="intro-inputs" type="password" ref={(input) => { this.textInput = input; }} name="password" placeholder="Password"
                                onChange={this.findFieldValue} onKeyDown={this.setFieldValue} />
                                {this.state.error &&
                                    <p style={errorMessage}>
                                {this.state.error}
                                </p>
                                }
                            </div>
                        </div>
                    }

                </div>

                <div className="introface">
                    <img src='/images/batman.png' />
                </div>
            </div>
        )
    }
}
