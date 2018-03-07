import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import TypeWriter from 'react-typewriter';


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            emptyFirstName: false,
            emptyLastName: false,
            emptyEmail: false,
            emptyPassword: false,
            intro: true,
            firstTime: false,
            firstName: false,
            lastName: false,
            email: false,
            password: false,
            submit: false,
            userInputValue: ''
        };
        this.setFieldValue = this.setFieldValue.bind(this);
        this.submit = this.submit.bind(this);
        this.registerTime = this.registerTime.bind(this);
        this.goBack = this.goBack.bind(this);
        this.quit = this.quit.bind(this);
        this.focusTextInput = this.focusTextInput.bind(this);
        this.findFieldValue = this.findFieldValue.bind(this);
        this.findPasswordValue = this.findPasswordValue.bind(this);


    }

    goBack(e) {
        // if(e.keyCode == 27) {
        //     console.log("escape!");
        // }
    }
    setFieldValue(e) {
        var self = this;
        if(e.keyCode == 13) {
            if(e.target.name == 'first') {
                if(!e.target.value.length) {
                    this.setState({
                        emptyFirstName: true
                    })
                } else {
                    this[e.target.name] = e.target.value;
                    this.setState({firstName: false, lastName: true, userInputValue: ''}, function(){
                        self.focusTextInput();
                    })
                }

            }
            if(e.target.name == 'last') {
                if(!e.target.value.length) {
                    this.setState({
                        emptyLastName: true
                    })
                } else {
                    this[e.target.name] = e.target.value;
                    this.setState({lastName: false, email: true, userInputValue: ''}, function(){
                        self.focusTextInput();
                    })
                }
            }
            if(e.target.name == 'email') {
                if(!e.target.value.length) {
                    this.setState({
                        emptyEmail: true
                    })
                } else {
                this[e.target.name] = e.target.value;
                this.setState({email: false, password: true, userInputValue: ''}, function(){
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
                    }, function() {
                        self.focusTextInput();
                    })
                    self.submit();
                }
            }
        }
    }
    findPasswordValue(e) {
        var starredPassword = '*'.repeat(e.target.value.length);
        this.setState({
            userInputValue: starredPassword
        })
    }
    findFieldValue(e) {
        this.setState({
            userInputValue: e.target.value
        })
    }
    submit(e) {
            axios.post('/register', {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            })
                .then((res) => {
                    if(res.data.success) {
                        location.replace('/');
                    } else if(res.data.incompletePassword) {
                        this.setState({
                            error: 'Please enter a password'
                        })
                    } else if(res.data.incompleteDetails) {
                        this.setState({
                            error: 'Incomplete Details'
                        })
                    } else if (res.data.notUniqueEmail) {
                        this.setState({
                            error: 'This email address has already been registered'
                        })
                    }
            })
                .catch((err) => {
                    console.log(err);
            })
    }
    registerTime() {
        var self = this;
        this.setState({intro: false, firstName: true}, function(){
            self.focusTextInput();
        })
    }
    quit() {
        this.setState({
            firstName: false,
            lastName: false,
            email: false,
            password: false,
            intro: true
        })
        this.props.activateIntroScreen();
    }
    focusTextInput() {
        this.textInput.focus();
    }
    componentDidMount() {
        var self = this;
        window.addEventListener("keydown", function(e) {
            if(e.key == "Escape") {
                if(self.state.firstName === true) {
                    self.props.activateIntroScreen();
                    self.setState({
                        firstName: false,
                        intro: true,
                        userInputValue: ''
                    })
                }
                if(self.state.lastName === true) {
                    self.setState({
                        lastName: false,
                        firstName: true,
                        userInputValue: ''

                    }, function(){
                        self.focusTextInput();
                    })
                }
                if(self.state.email === true) {
                    self.setState({
                        email: false,
                        lastName: true,
                        userInputValue: ''

                    }, function(){
                        self.focusTextInput();
                    })
                }
                if(self.state.password === true) {
                    self.setState({
                        password: false,
                        email: true,
                        userInputValue: ''

                    }, function(){
                        self.focusTextInput();
                    })
                }
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
            <div className="register-screen" onKeyDown={(e) => this.goBack(e)}>
            {!this.state.intro &&
                <Link to="/login"><button id="forgot-register" type="button" name="forgot-register">login</button></Link>
            }
            <button id="quit-game" type="button" name="quit" onClick={this.quit}>Quit</button>

                <div className="greeting">
                    {this.state.intro &&
                        <div className="message-caption">
                            <div>
                                <TypeWriter className="question" typing={1}>Hi there, have you been here before?</TypeWriter>



                            </div>
                            <div className="yes-or-no">
                                <Link to="/login"><button className="register-button"  id="yes" type="button" name="yes" >Yes</button></Link>
                                <button className="register-button" id="no" type="button" name="no" onClick={this.registerTime}>No</button>
                            </div>
                        </div>
                    }
                    {this.state.firstName &&
                        <div className="message-caption">
                            <div>
                                {!this.state.emptyFirstName &&
                                    <TypeWriter className="question" typing={1.5}>Oh cool, whats your name? </TypeWriter>
                                }
                                {this.state.emptyFirstName &&
                                    <TypeWriter className="question errormessage" typing={2}>Well, you have to have some sort of name...?</TypeWriter>
                                }
                            </div>
                            <div className="input">
                                <p className="user-input">{this.state.userInputValue}</p>
                                <input className="intro-inputs" type="text" ref={(input) => { this.textInput = input; }}
                                name="first" onChange={this.findFieldValue} onKeyDown={this.setFieldValue}/>
                            </div>
                        </div>
                    }

                    {this.state.lastName &&
                        <div className="message-caption">
                            <div>
                                {!this.state.emptyLastName &&
                                    <TypeWriter className="question" typing={1.5}>That's a funny sounding name... But ok! What is your last name?</TypeWriter>
                                }
                                {this.state.emptyLastName &&
                                    <TypeWriter className="question errormessage" typing={2}>No last name?! But then... how were you born...?</TypeWriter>
                                }
                            </div>
                            <div className="input">
                            <p className="user-input">{this.state.userInputValue}</p>
                                <input className="intro-inputs" type="text" ref={(input) => { this.textInput = input; }}
                                name="last" onChange={this.findFieldValue} placeholder="Last Name" onKeyDown={this.setFieldValue}/>
                            </div>
                        </div>
                    }
                    {this.state.email &&
                        <div className="message-caption">
                            <div>
                                {!this.state.emptyEmail &&
                                    <TypeWriter className="question" typing={1.5}>What is your email address? I need a pen pal.. :)</TypeWriter>
                                }

                                {this.state.emptyEmail &&
                                    <TypeWriter className="question errormessage" typing={2}>Tsk, tsk... Go make an email address and then come back...</TypeWriter>
                                }
                            </div>
                            <div className="input">
                                <p className="user-input">{this.state.userInputValue}</p>
                                <input className="intro-inputs"  type="text" ref={(input) => { this.textInput = input; }}
                                name="email" onChange={this.findFieldValue} placeholder="Email Address" onKeyDown={this.setFieldValue}/>
                            </div>
                        </div>
                    }
                    {this.state.password &&
                        <div className="message-caption">
                            <div>
                                {!this.state.emptyPassword &&
                                    <TypeWriter className="question" typing={1.5}>Last step..! Choose a password to secure your stuff!</TypeWriter>
                                }

                                {this.state.emptyPassword &&
                                    <TypeWriter className="question errormessage" typing={2}>Hmmm... You really need a password though. I promise I won't tell!</TypeWriter>
                                }
                            </div>
                            <div className="input">
                                <p className="user-input">{this.state.userInputValue}</p>
                                <input className="intro-inputs"  type="text" ref={(input) => { this.textInput = input; }}
                                type ="password" onChange={this.findPasswordValue} name="password" placeholder="Password" onKeyDown={this.setFieldValue}/>
                            </div>
                        </div>
                    }
                    {this.state.error &&
                        <p style={errorMessage}>
                            {this.state.error}
                        </p>
                    }
                    {this.state.submit && <button name="Submit"  onClick={this.submit}>Submit</button>}

                </div>
                    <div className = "registration-form">

                    </div>

                <div className="introface">
                    <img src='/images/batman.png' />
                </div>
            </div>

        )
    }
}
