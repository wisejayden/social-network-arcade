import React from 'react';
import { Link } from 'react-router-dom';


export default function Friend({friend}) {
    if(friend.profile_image == 'https://s3.amazonaws.com/spicedling/jayden/null') {
        return (
            <div className="friend">
                <Link to={"/user/" + friend.id}><img className="each-friend-image" src='/images/unknownprofile.svg' alt={friend.first + ' ' + friend.last} /></Link>
                <p>{friend.first} {friend.last}</p>
            </div>
        )
    } else {
        return(
            <div className="friend">
                <Link to={"/user/" + friend.id}><img className="each-friend-image" src={friend.profile_image} alt={friend.first + ' ' + friend.last} /></Link>
                <p>{friend.first} {friend.last}</p>


            </div>
        );
    }
}
