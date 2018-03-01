import React from 'react';

export function ProfilePicEdit(props) {
    if (!props.image) {
        return (
            <div>
                <img src='/images/unknownprofile.svg'  className="profilepic" alt={props.user.first + ' ' + props.user.last} onClick={props.showUploader}/>
            </div>
        )
    }
    return(
        <div>
            <img src={props.image} alt={props.user.first + ' ' + props.user.last} className="profilepic" onClick={props.showUploader} />
        </div>
    )
}
