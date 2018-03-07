import React from 'react';
import axios from './axios';

export class ChangeBackground extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    componentDidMount() {
        axios.get('/get-background-images')
            .then((results) => {
                //Find all saved potential backgrounds and display them. 
                var resultingBackgrounds = results.data.backgrounds.backgrounds;
                let allBackgrounds = [];
                for (var i = 0; i < resultingBackgrounds.length; i++) {
                    allBackgrounds.push(
                            <img key={i} onClick={this.props.setBackgroundFunction} className= "all-backgrounds" src={resultingBackgrounds[i]} />
                    )
                }
                this.setState({
                    allBackgrounds
                })
            })
    }
    render() {
        return(
            <div className="all-backgrounds-container">
                <h1>Customize</h1>
                {this.state.allBackgrounds}
            </div>
        )
    }
}
