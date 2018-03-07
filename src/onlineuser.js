import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';


export default function OnlineUser({onlineUser}) {
    if(onlineUser.profile_image == 'https://s3.amazonaws.com/spicedling/jayden/null') {
        return (
            <div className="onlineUser">
                <Link to={"/user/" + onlineUser.id}><img className="onlineuser-image"  src='/images/unknownprofile.svg' alt={onlineUser.first + ' ' + onlineUser.last} /></Link>
                <p className="onlineusername">{onlineUser.first} {onlineUser.last}</p>
            </div>
        )
    } else {
        return(
            <div className="onlineUser">
                <Link to={"/user/" + onlineUser.id}><img className="onlineuser-image" src={onlineUser.profile_image} alt={onlineUser.first + ' ' + onlineUser.last} /></Link>
                <p className="onlineusername">{onlineUser.first} {onlineUser.last}</p>
            </div>
        );
    }
}
