import React from "react";

export default class RegisterModal extends React.Component {
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
                        <div>User Login</div>
                        <form onSubmit={this.onSubmit} className="forms" >
                        <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
                        <br />
                        <input type="password" name="password" placeholder="password" onChange={this.onChange} />
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                    <button onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}