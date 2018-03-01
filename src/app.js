import React from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import axios from './axios';
import {ProfilePicEdit} from './profilepicedit';
import {Uploader} from './uploader';
import {Profile} from './profile';
import {OtherUser} from './otheruser';
import {ProfilePicDisplay} from './profilepicdisplay';
import FriendsList from './friendslist';
import OnlineUsers from './onlineusers';
import Chat from './chat';
import TypeWriter from 'react-typewriter';
import {ChangeBackground} from './changebackground';


const welcomeImage = '/images/beginnersguide.png';


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user: '',
            image: '',
            uploadFile: '',
            bio: '',
            uploaderVisible: false,
            imageStyle: 'headerimage',
            menuVisible: false,
            menuButton: true,
            largeModalVisible: false,
            firstWelcome: true,
            currentBackground: ''
        };
        // this.showUploader = this.showUploader.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.menuOptionClicked = this.menuOptionClicked.bind(this);
        this.closeLargerModal = this.closeLargerModal.bind(this);
        this.setBackgroundFunction = this.setBackgroundFunction.bind(this);
        this.showOtherUsersBackground = this.showOtherUsersBackground.bind(this);
        this.clickOtherUser = this.clickOtherUser.bind(this);


    }
    componentDidUpdate() {
        console.log("UPDATING");
    }
    componentDidMount() {
        //axios request to get user info and then pass to setState
        console.log(location.pathname.length);
        if(location.pathname.length > 1) {
            this.setState({
                largeModalVisible: true,
                menuButton: false,
                firstWelcome: false

            })
        }
        var self = this;
        axios.get('/user')
            .then((res) => {
                console.log("______________________", res.data.background);
                this.setState({
                    style: {backgroundImage: 'url(' + res.data.background + ')'}
                })
                    // this.style = {backgroundImage: 'url(' + res.data.background + ')'};

                this.setState({ user: res.data, image: res.data.profileImage, bio: res.data.message, currentBackground: res.data.background
            })
        })
        window.addEventListener("keydown", function(e) {
            if(e.key == "Escape") {
                if(self.state.menuVisible && !self.state.uploaderVisible) {
                    self.setState({
                        menuVisible: false,
                        menuButton: true
                    })

                }
                if(self.state.largeModalVisible && !self.state.uploaderVisible) {
                    self.setState({
                        largeModalVisible: false,
                        menuVisible: true
                    })

                }
                if(!self.state.menuVisible && self.state.uploaderVisible && !self.state.largeModalVisible) {
                    self.setState({
                        uploaderVisible: false,
                        menuButton: true
                    })

                }
                if(self.state.menuVisible && self.state.uploaderVisible) {
                    self.setState({
                        uploaderVisible: false
                    })

                }
                if(self.state.largeModalVisible && self.state.uploaderVisible) {
                    //largeModal ACTIVE and uploader ACTIVE
                    self.setState({
                        uploaderVisible: false
                    })

                }
            }
        })
    }
    showOtherUsersBackground(image) {
        this.style = {backgroundImage: 'url(' + image + ')'};
    }
    updateImage(image) {
        this.setState({ image });
        this.setState({ uploaderVisible: false, menuButton: true});

    }
    updateBio(message) {
        this.setState({bio: message})
    }
    showUploader() {

        ///REMOVE IF SUCCESSFUL
        if(this.state.uploaderVisible == true && this.state.menuVisible && !this.state.largeModalVisible ) {
            this.setState({ uploaderVisible: false })
        } else if (this.state.uploaderVisible && !this.state.menuVisible && !this.state.largeModalVisible) {
            console.log("Looking for this");
            this.setState({
                uploaderVisible: false,
                menuButton: true
            })
        } else if (this.state.uploaderVisible == true && !this.state.menuVisible && this.state.largeModalVisible ){
            this.setState({ uploaderVisible: false })
        } else {
            this.setState({ uploaderVisible: true, menuButton: false, firstWelcome: false })

        }
    }

    showMenu() {
        this.setState({
            menuVisible: true,
            menuButton: false,
            firstWelcome: false

        })
    }
    closeMenu() {
        this.setState({
            menuVisible: false,
            menuButton: true
        })
    }
    closeLargerModal() {
        this.setState({
            largeModalVisible: false,
            menuButton: true
        })
    }
    menuOptionClicked() {
        this.setState({
            menuVisible: false,
            largeModalVisible: true
        })
    }
    clickOtherUser (id) {
        console.log("HELLO", id);
    }
    setBackgroundFunction(img) {
        console.log("Click on image to change background!");
        var hostWebsite = "http://localhost:8080";
        var image = img.target.src.replace(hostWebsite, '');
        console.log(image);
        axios.post('/update-background-image', {image})
            .then((result) => {
                console.log("success!");
            })

        // this.style = {backgroundImage: 'url(' + this.state.currentBackground + ')'}


        this.setState({
            currentBackground: image,
            style: {backgroundImage: 'url(' + image + ')'}

        })
    }
    render() {


        return(
            <BrowserRouter>

                    <div className="border">
                            <a href="/logout"><button id="quit-game" type="button" name="quit" onClick={this.quit}>Quit</button></a>


                        <div style={this.state.style} className="banner-image">
                        {!this.state.image &&
                            <img src="/images/unknownprofile.svg" alt={this.state.user.first + ' ' + this.state.user.last} id="menu-profile-image"  onClick={this.showUploader} />
                        }
                        {this.state.image &&
                            <img src={this.state.image} alt={this.state.user.first + ' ' + this.state.user.last} id="menu-profile-image"  onClick={this.showUploader} />
                        }

                            {this.state.menuButton &&
                                <div>
                                {this.state.user && this.state.firstWelcome &&
                                    <TypeWriter id="welcomeback" typing={1}>Welcome {this.state.user.first} </TypeWriter>
                                }
                                    <button id="main-button" type="button" name="menu" onClick={this.showMenu}>Menu</button>
                                </div>
                            }



                        {this.state.menuVisible &&
                            <div className="modalback">
                                <div className="menu">
                                    <button style={this.state.style} id="closemenu" onClick={this.closeMenu}>X</button>
                                    <ul>
                                        <li><Link to="/profile"><button style={this.state.style} className="menubuttons" id="profilemenubutton" type="button" name="profile" onClick={this.menuOptionClicked}>Profile</button></Link></li>
                                        <li><Link to='/chat'><button style={this.state.style} className="menubuttons" id="chatmenubutton" type="button" name="chat" onClick={this.menuOptionClicked}>Chat</button></Link></li>
                                        <li><Link to="/friends"><button style={this.state.style} className="menubuttons" id="friendmenubutton" type="button" name="button" onClick={this.menuOptionClicked}>Friends</button></Link></li>
                                        <li><Link to="/online-users"><button style={this.state.style} className="menubuttons" id="onlinemenubutton" type="button" onClick={this.menuOptionClicked}>Online Users</button></Link></li>
                                        <li><Link to="/change"><button style={this.state.style} className="menubuttons" id="changemenubutton" type="buttons" name="change" onClick={this.menuOptionClicked}>Change Theme</button></Link></li>
                                    </ul>
                                </div>
                            </div>
                        }



                        {this.state.largeModalVisible &&
                            <div className="largermodal">
                            <Link to='/'><button id="closemenu" onClick={this.closeLargerModal}>X</button></Link>


                                    <Route
                                        exact path="/profile"
                                        render={() => (
                                            <Profile
                                                image={this.state.image}
                                                user={this.state.user}
                                                bio={this.state.bio}
                                                updateBio={this.updateBio}
                                                showUploader={this.showUploader}

                                            />
                                        )}
                                    />

                                    <Route
                                        exact path="/change"
                                        render={() => (
                                            <ChangeBackground
                                                setBackgroundFunction = {this.setBackgroundFunction}
                                            />
                                        )}
                                    />
                                    <Route
                                        exact path="/user/:id"
                                        render={(props) => (
                                            <OtherUser
                                                match = {props.match}
                                                history = {props.history}
                                                showOtherUsersBackground = {this.showOtherUsersBackground}
                                            />
                                        )}
                                    />
                                    <Route
                                        exact path="/friends"
                                        component={FriendsList}
                                    />
                                    <Route
                                        exact path="/online-users"
                                        component={() => (
                                            <OnlineUsers
                                            clickOtherUser = {this.clickOtherUser}
                                            />
                                        )}
                                    />
                                    <Route
                                        exact path="/chat"
                                        component={() => (
                                            <Chat
                                                user= {this.state.user}
                                            />
                                        )}
                                    />


                                <div>


                                </div>
                        </div>
                    }
                    {this.state.uploaderVisible &&
                        <Uploader user={this.state.user} image={this.state.image} updateImage={this.updateImage} showUploader={this.showUploader} background={this.state.style}/>
                    }
                        <footer>
                        </footer>
                        </div>
                </div>

            </BrowserRouter>


        )
    }
}


    // {this.state.user && <Link to="/"><ProfilePicDisplay image = {this.state.image} user = {this.state.user} showUploader={this.showUploader} className ="profilepic" /></Link> }
