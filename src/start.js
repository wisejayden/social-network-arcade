import React from 'react';
import ReactDOM from 'react-dom';
import {Register} from './register'
import { HashRouter, Route, Link } from 'react-router-dom';
import {Login} from './login';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import {App} from './app';


import { initSocket } from './socket';

if (location.path != './welcome') {
    initSocket();
}

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));






const welcomeImage = '/images/beginnersguide.png';
const elem = (
    <Provider store={store}>
        <App />
    </Provider>
)




export class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            introscreen: true
        };
        this.closeIntroScreen = this.closeIntroScreen.bind(this);
        this.keyDownIntroScreen = this.keyDownIntroScreen.bind(this);
        this.quitButton = this.quitButton.bind(this);
        this.activateIntroScreen = this.activateIntroScreen.bind(this);
    };
    closeIntroScreen() {
        this.setState({introscreen: false})

    }
    keyDownIntroScreen(e) {
        console.log("hello");
        console.log(e.keycode);
        // if(keyCode ==)
    }
    quitButton() {

        this.setState({
            introscreen: true
        })
    }
    activateIntroScreen() {
        this.setState({
            introscreen: true
        })
    }
    render() {
        return(
            <div className="register">


                <div className="introscreen">
                    {this.state.introscreen && <img onClick={this.closeIntroScreen} onKeyDown={this.keyDownIntroScreen} id ="press-start" src="/images/pressstart.gif" />}
                </div>

                <HashRouter>
                    <div>
                        <Route
                            exact path="/"
                            render={() => (
                                <Register
                                    activateIntroScreen={this.activateIntroScreen}
                                    />
                                )}
                                />


                        <Route
                            path="/login"
                            render={() => (
                                <Login
                                activateIntroScreen={this.activateIntroScreen}
                            />
                        )}
                        />
                    </div>
                </HashRouter>
            </div>
        )
    }
}

if (location.pathname == '/welcome') {
    ReactDOM.render(
        <Welcome />,
        document.querySelector('main')
    );
} else {
    ReactDOM.render(elem,document.querySelector('main'));
}

// <div>
// <video className="videoTag" type="video/mp4" autoPlay>
//         <source src="/images/tv.mp4" type="video/mp4" />
//     </video>
// </div>


    //
    // <video id="background" src="/images/tv.mp4" autoplay />
