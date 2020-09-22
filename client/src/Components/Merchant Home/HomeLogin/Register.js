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
            <div className="row login-overlay">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin forms" onSubmit={this.onSubmit} >
                                <div className="form-label-group">
                                    <div>Merchant Register</div>
                                    <input className="form-control" required autofocus
                                        type="text" name="name" placeholder="Username" onChange={this.onChange} />
                                    <label for="name">Name</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="text" name="address" placeholder="Address" onChange={this.onChange
                                    } className="form-control" required />
                                    <label for="addresss">Address</label>
                                </div>

                                <div className="form-label-group">
                                    <input name="postalCode" placeholder="Postal Code" onChange={this.onChange} className="form-control" required />
                                    <label for="postalCode">Postal Code</label>
                                </div>
                                <div className="form-label-group">
                                    <input type="text" name="uen" placeholder="UEN" onChange={this.onChange} className="form-control" required />
                                    <label for="uen">UEN</label>
                                </div>
                                <div className="form-label-group">
                                    <input type="text" name="cuisine" placeholder="Cuisine" onChange={this.onChange} className="form-control" required />
                                    <label for="Cuisine">Cuisine</label>
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


