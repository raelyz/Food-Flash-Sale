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
            <div className="login-overlay" style={{ display: this.props.displaylogin }}>
                <div className="formsParent">
                    <div>Merchant Login</div>
                    <form onSubmit={this.onSubmit} className="forms" >
                        <input type="text" name="name" placeholder="Username" onChange={this.onChange} />
                        <br />
                        <input type="password" name="password" placeholder="password" onChange={this.onChange} />
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}

// if(!fields["email"]){
//     formIsValid = false;
//     errors["email"] = "Cannot be empty";
//  }

//  if(typeof fields["email"] !== "undefined"){
//     let lastAtPos = fields["email"].lastIndexOf('@');
//     let lastDotPos = fields["email"].lastIndexOf('.');

//     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
//        formIsValid = false;
//        errors["email"] = "Email is not valid";
//      }
// }  