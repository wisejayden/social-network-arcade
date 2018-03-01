class Registration extend React.Component {
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
            last: this.last,
            email: this.email,
            pass: this.pass
        }).then(({data}) => {
            if (data.success) {
                location.replace('/')''
            } else {
                this.setState({
                    error: true
                });
            }
        })
    }
    render() {
        return (
            <div>
                {this.state.error && <div>FAILURE</div>}
                <input name="first" onChange={e => setFieldValue(e)} />
                <input name="last" onChange={e => setFieldValue(e)} />


                <button onClick={() => this.submit()} /></button>
            </div>
        )
    }
}
