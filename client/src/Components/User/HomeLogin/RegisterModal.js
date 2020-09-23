import React from "react";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

export default class RegisterModal extends React.Component {

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
    if(!this.props.open) return null
    return (
            <div className="overlayBackground">
                <div className="overlay">
                    <div className="formsParent" >
                        <div class="wrapper2">
                            <div class="container2">
                                <div className="userRegisterX" onClick={this.props.onClose} ><HighlightOffRoundedIcon /></div>
                                <h1 className="h1R">New User</h1>
                                <form onSubmit={this.onSubmit} className="forms" >
                                    <input type="text" name="username" placeholder="Username" onChange={this.onChange} className="formsInput" />
                                    <input type="email" name="email" placeholder="Email" onChange={this.onChange} className="formsInput" />
                                    <input type="password" name="password" placeholder="Password" onChange={this.onChange} className="formsInput"/>
                                    <input type="submit" value ="Register" id="login-button"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}