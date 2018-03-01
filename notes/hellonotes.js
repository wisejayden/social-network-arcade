import React from 'react';
import { Greetee } from '/.start'

export class Hello extends React.Component {
    constructor(props) {
        super(props); //super attaches the props to the instance. Can now reference everything to do with hello as this.
        this.state = {
            greetee: this.props.greetee
        };
        console.log(this.props);
        this.funky = 'chicken';
        this.clickHandler = this.clickHandler.bind(this);
        // ORRR
        <span onClick={() => this.clickHandler()}>Hello</span>


    }
    clickHandler(e) {
        this.setState({
            greetee: 'World'
        })
    }
    changeGreetee(newGreetee) {
        this.setState){ greeteeL newGreetee });
    }

    render() {
        return (
            <div>
                <span onClick={this.clickHandler}>Hello</span>,
                <Greetee greetee={this.state.greeetee} />
                <GreeteeChanger changer = {(val) => changeGreetee(val)}/>
            </div>
        )

    }
}

/*change state by using this.setState({
    greetee: 'Dolly'
})

setState is asynchonous
*/



function GreeteeChanger() {
    return(
        <div>
            <input onInput={e => props.changer(e.target.value) />
        </div>
    )
}
