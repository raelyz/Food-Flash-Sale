import React from "react";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { withRouter } from 'react-router'

class LoginModal extends React.Component {
constructor(props) {
        super(props)
        this.state = {
            username: "",
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
        const { username, password } = this.state;
        const data = {
            username,
            password
        };
        fetch('/home/login/user', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        }).then(res =>
            res.json()
        ).then(res => {
            // if the user acctually successfully registered
            if (res.userId && res.userName) {
                let login = this.props.onLogin
                login(res.userId, res.userName)
            }
        }).catch(err => {
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
                                <h1 className="h1R">Welcome Back!</h1>
                                <form onSubmit={this.onSubmit} className="forms" >
                                    <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
                                    <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                                    <input type="submit" value ="Login" id="login-button"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginModal);