import React from "react";

export default class LoginModal extends React.Component {
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
    if(!this.props.open) return null
    return (
            <div className="overlayBackground">
                <div className="overlay">
                    <div className="formsParent" >
                    <div>Merchant Login</div>
                    <form onSubmit={this.onSubmit} className="forms" >
                        <input type="text" name="name" placeholder="Username" onChange={this.onChange} />
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