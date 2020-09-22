import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: ""
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { name, password } = this.state;
        const data = {
            name,
            password
        };
        fetch('/home/login/merchant', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        }).then(res =>
            res.json()
        ).then(res => {
            // if the user acctually successfully registered
            console.log(res)
            if (res.merchantId && res.merchantUsername) {
                let login = this.props.MercOnLogin
                login(res.merchantId, res.merchantUsername)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="row login-overlay">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin forms" onSubmit={this.onSubmit}>
                                <div className="form-label-group">
                                    <div>Merchant Login</div>
                                    <input className="form-control" required autofocus
                                        type="text" name="name" placeholder="Username" onChange={this.onChange} />
                                    <label for="name">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input id="inputPassword" type="password" name="password" placeholder="password" onChange={this.onChange} className="form-control" placeholder="Password" required />
                                    <label for="inputPassword">Password</label>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


/* /* if(!fields["email"]){
    formIsValid = false;
errors["email"] = "Cannot be empty";
}

if(typeof fields["email"] !== "undefined"){
    let lastAtPos = fields["email"].lastIndexOf('@');
let lastDotPos = fields["email"].lastIndexOf('.');

if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    formIsValid = false;
errors["email"] = "Email is not valid";
}
}   */