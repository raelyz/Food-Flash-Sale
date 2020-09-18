import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }
    onChange=(e)=> {
         this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit=(e)=> {
         e.preventDefault();
         const { username, password, email } = this.state;
             const data = {
                  username,
                  password,
                  email,
                };
         fetch('/home/register/user',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        }).then(res=>
            res.json()
        ).then(res=> {
            console.log(res)
            // if the user acctually successfully registered
            if(res.userId && res.userName) {
                let registered = this.props.onRegistered;
                registered(res.userId, res.userName);
            }
        }).catch(err=> {
            console.log(err)
          })
    }
    render() {
        return (
            <div className="login-overlay" style={{display: this.props.displaysignup}}>
                <div className="formsParent">
                <div>Sign Up as a New User</div>
                <form onSubmit={this.onSubmit} className="forms" >
                    <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
                    <br/>
                    <input type="text" name="email" placeholder="Email" onChange={this.onChange}/>
                    <br/>
                    <input type="password" name="password" placeholder="password" onChange={this.onChange}/>
                    <br/>
                    <input type="submit" value ="Submit"/>
                </form>
                </div>
            </div>
        )
    }
}