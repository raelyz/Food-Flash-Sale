import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            address: "",
            postalCode: "",
            uen: "",
            cuisine: ""
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { name, password, email, address, uen, postalCode, cuisine } = this.state;

        fetch(`https://developers.onemap.sg/commonapi/search?searchVal=revenue&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(res => {
                console.log(res)
                const data = {
                    name,
                    password,
                    email,
                    address,
                    postalCode,
                    uen,
                    cuisine,
                    latitude: res.results[0].LATITUDE,
                    longitude: res.results[0].LONGTITUDE
                };
                console.log(data)
                fetch('/home/register/merchant', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data),
                })
                    .then(res =>
                        res.json()
                    ).then(res => {
                        // if the merchant acctually successfully registered
                        if (res.merchantId && res.merchantUsername) {
                            let registered = this.props.MercOnRegistered;
                            registered(res.merchantId, res.merchantUsername);
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            })
    }
    render() {
        return (
            <div className="login-overlay" style={{ display: this.props.displaysignup }}>
                <div className="formsParent" style={{ height: "250px" }}>
                    <div>Sign Up as a New Merchant</div>
                    <form onSubmit={this.onSubmit} className="forms" >
                        <input type="text" name="name" placeholder="username" onChange={this.onChange} />
                        <br />
                        <input type="text" name="email" placeholder="Email" onChange={this.onChange} />
                        <br />
                        <textarea style={{ width: "145px", resize: "none" }} type="text" name="address" placeholder="Address" onChange={this.onChange} />
                        <br />
                        <input type="text" name="postalCode" placeholder="Postal Code" onChange={this.onChange} />
                        <br />
                        <input type="text" name="uen" placeholder="UEN" onChange={this.onChange} />
                        <br />
                        <input type="text" name="cuisine" placeholder="Cuisine" onChange={this.onChange} />
                        <br />
                        <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                    <button >testing</button>
                </div>
            </div>
        )
    }
}