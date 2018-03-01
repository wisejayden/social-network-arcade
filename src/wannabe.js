import React from 'react';
import {ProfilePicDisplay} from './profilepicdisplay';
import { Link } from 'react-router-dom';


export default function Wannabe({wannabe}) {


    if(wannabe.profile_image == 'https://s3.amazonaws.com/spicedling/jayden/null') {
        return (
            <div className="wannabe">
                <Link to={"/user/" + wannabe.id}><img className="each-wannabe-image" src='/images/unknownprofile.svg' alt={wannabe.first + ' ' + wannabe.last} />
                <p>{wannabe.first} {wannabe.last}</p></Link>
            </div>
        )
    } else {
        return(
            <div className="wannabe">
            <Link to={"/user/" + wannabe.id}><img className="each-wannabe-image" src={wannabe.profile_image} alt={wannabe.first + ' ' + wannabe.last} /></Link>
                <p>{wannabe.first} {wannabe.last}</p>


            </div>
        );
    }



}


// <img src={wannabe.profile_image} />
