import React from 'react';

export function ProfilePicDisplay(props) {
    if (!props.image) {
        return (
                <img src='/images/unknownprofile.svg'  className="profilepic" alt={props.user.first + ' ' + props.user.last} />
        )
    }
    return(
            <img src={props.image} alt={props.user.first + ' ' + props.user.last} className={props.className}  />
    )
}
