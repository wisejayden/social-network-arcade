import React from 'react';
import ReactDOM from 'react-dom';
import { Hello, GoodBye } from './hello';
import Greetee from './greetee'; //No curcly braces needed for default export

/*export default function Greetee(props) {

} */


//If you want state you should use class
ReactDOM.render(
    <Hello greetee="Kitty"/>,
    document.querySelector('main')
);

function Hello(props) {
    return (
        <div>
            Hello, <Greetee greetee={props.greetee} />
            </div>
    );
}

function Greetee(props) {
    const myGreetee = props.greetee + ', Jr.';


    const a = [
        10, 20, 30, 40
    ]
    const sty = {color : 'red' };

    return (
        <div id="hello-world" style={{color: 'red'}}>
        <div id="hello-world" style={sty}>

            Hello, {props.greetee}!
            <Red>
                <div>{props.myGreetee || 'World'}</div>
                The magic numbers are: {a.map(n => <span>{n} </span>)}
            </Red>
        </div>
    );
}

<hello>
    <greetee></greetee>
</hello>


function Red(props) {
    const sty = {color : 'red' };
    return (
        <span style ={sty}>{props.children}</span>
    )
}




//Day one
Three parts, first component is welcome message + splash
.
Login in part 2
Register will be a child of login
axios ajax request o submit data.
If successful, redirect to the login experience. With single logo
Client needs to know if user is logged in.



app.get('/welcome' function(req, res) {
    if(req.session.user) {
        res.redirect('/');
    } else {
        res.redirect('/')
    }
})



import React
import ReactDOM
import welcome
import logo

let component;
if (location.pathname =='/welcome') {
    component = <Welcome />
} else new Promise(function(resolve, reject) {
    component = <Logo />
});
ReactDOm.render(component, document.querySelector('main'));


class Registration extend React.Component new Promise(function(resolve, reject) {
    constructor(props) {
        super(props);
        this.state = {};
    }
    setFieldValue(e) {
        this[e.target.name] = e.target.value
    }
    submit() {
        axios.post('/register', {
            first: this.first,
            email: this.email
        }).then(({ data }) => {
            if (data.success) {
                location.href = '/';
                //
                location.replace('/');
            }
        })
    }
    render() {
        return(
            <div>
            <
                <input name="first" onChange={e => setFieldValue(e)}
                <input name="last" onChange={e => setFieldValue(e)}

                <button onClick={() => this.submit() /}></button>

        )
    }
});
<input name="first" onChange={e => setFieldValue(e)}


 onClick={submit(e)}
onChange={setFieldValue(e)}


setFieldValue(e) {
    this[e.target.name] = e.target.value
}
submit(e) {
    this[e.target.name] = e.target.value
    console.log("Hello");
    axios.post('/register', {
        first: this.first,
        last: this.last,
        email: this.email
    }).then(() => {
        console.log("Successful response");
    }).catch(() => {
        console.log("Failed response");
    })
}
