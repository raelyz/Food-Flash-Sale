import React, { Component } from "react";
import { withRouter } from 'react-router'
import { Form, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class CreateItem extends Component {
    constructor() {
        super();
        this.state = { fields: {}, errors: {} }
    }

    fieldValidation() {
        console.log(`triggering`)
        let fields = this.state.fields;
        let errors = {};
        let dataValidity = true;

        if (!fields["item_name"]) {
            dataValidity = false;
            errors["item_name"] = "Cannot be Empty"
        }
        if (typeof fields["item_name"] !== "undefined") {
            if (!fields["item_name"].match(/^[a-zA-Z]+$/)) {
                dataValidity = false;
                errors["item_name"] = "Only letters";
            }
        }
        if (!fields["unit_price"]) {
            dataValidity = false;
            errors["unit_price"] = "Cannot be Empty"
        }
        if (typeof fields["unit_price"] !== "undefined") {
            if (isNaN(fields["unit_price"]) || parseInt(fields["unit_price"]) < 0) {
                dataValidity = false;
                errors["unit_price"] = "Only Numbers";
            }
        }
        if (!fields["quantity"]) {
            dataValidity = false;
            errors["quantity"] = "Cannot be Empty"
        }
        if (typeof fields["quantity"] !== "undefined") {
            if (isNaN(fields["quantity"]) || parseInt(fields["quantity"]) < 0) {
                dataValidity = false;
                errors["quantity"] = "Only Numbers";
            }
        }
        if (!fields["price_ceiling"]) {
            dataValidity = false;
            errors["price_ceiling"] = "Cannot be Empty"
        }
        if (typeof fields["price_ceiling"] !== "undefined") {
            if (isNaN(fields["price_ceiling"]) || parseInt(fields["price_ceiling"]) < 0) {
                dataValidity = false;
                errors["price_ceiling"] = "Only Numbers";
            }
        }
        if (!fields["price_floor"]) {
            dataValidity = false;
            errors["price_floor"] = "Cannot be Empty"
        }
        if (typeof fields["price_floor"] !== "undefined") {
            if (isNaN(fields["price_floor"]) || parseInt(fields["price_floor"]) < 0) {
                dataValidity = false;
                errors["price_floor"] = "Only Numbers";
            }
        }
        if (!fields["description"]) {
            dataValidity = false;
            errors["description"] = "Cannot be Empty"
        }
        if (parseInt(fields["unit_price"]) < parseInt(fields["price_ceiling"]) || parseInt(fields["unit_price"]) < parseInt(fields["price_floor"]) || parseInt(fields["price_ceiling"]) < parseInt(fields["price_floor"])) {
            dataValidity = false;
            errors["algorithm_error"] = "Unit Price > Price Ceiling > Price Floor"
        }
        this.setState({ errors: errors })
        return dataValidity
    }

    onChangeHandler(e, field) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    onSubmitHandler(e) {
        e.preventDefault()
        if (this.fieldValidation()) {
            let data = {
                item_name: e.target.item_name.value,
                unit_price: e.target.unit_price.value,
                quantity: e.target.quantity.value,
                price_ceiling: e.target.price_ceiling.value,
                price_floor: e.target.price_floor.value,
                description: e.target.description.value,
                category_id: e.target.category_id.value,
                time_limit_min: e.target.time_limit_min.value,
                merchant_id: e.target.merchant_id.value
            }
            fetch('/newListing', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            }).then(res =>
                res.json()
            ).then(res => {
                console.log(res)
                this.props.onClick();
            })
        } else {
            alert("Oh lord have mercy on your poor soul ----  you can't even fill in a form FFS")
        }
    }

    render() {
        return (
            <div>
                <div id="backgroundMerc"></div>
                <section className="page-section  bg-trans" >
                    <Form action="/newListing" onSubmit={(e) => this.onSubmitHandler(e)} method="post">
                        <Form.Row>
                            <Form.Label column lg={2}>Item Name</Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.onChangeHandler(e, "item_name") }} type="text" placeholder="Item Name" name="item_name" value={this.state.fields["item_name"]} />
                                {this.state.errors.item_name ? <span style={{ color: 'red' }}>Text Only</span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Unit Price</Form.Label>
                            <Col>
                                <Form.Control pattern="[0-9]*" onChange={(e) => { this.onChangeHandler(e, "unit_price") }} type="text" placeholder="Unit Price" name="unit_price" value={this.state.fields["unit_price"]} />
                                {this.state.errors.unit_price ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                                {this.state.errors.algorithm_error ? <span style={{ color: 'red' }}>Unit Price &#62;  Max Price &#62; Min Price </span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Quantity</Form.Label>
                            <Col>
                                <Form.Control pattern="[0-9]*" onChange={(e) => { this.onChangeHandler(e, "quantity") }} type="text" placeholder="Quantity" name="quantity" value={this.state.fields["quantity"]} />
                                {this.state.errors.quantity ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Maximum Price</Form.Label>
                            <Col>
                                <Form.Control pattern="[0-9]*" onChange={(e) => { this.onChangeHandler(e, "price_ceiling") }} type="text" placeholder="maximum price" name="price_ceiling" value={this.state.fields["price_ceiling"]} />
                                {this.state.errors.price_ceiling ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                                {this.state.errors.algorithm_error ? <span style={{ color: 'red' }}>Unit Price &#62;  Max Price &#62; Min Price </span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Minimum Price</Form.Label>
                            <Col>
                                <Form.Control pattern="[0-9]*" onChange={(e) => { this.onChangeHandler(e, "price_floor") }} type="text" placeholder="minimum price" name="price_floor" value={this.state.fields["price_floor"]} />
                                {this.state.errors.price_floor ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                                {this.state.errors.algorithm_error ? <span style={{ color: 'red' }}>Unit Price &#62;  Max Price &#62; Min Price </span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Category</Form.Label>
                            <Col>
                                <Form.Control name="category_id" as="select" custom>
                                    <option value="1">Snacks</option>
                                    <option value="2">Light Bites</option>
                                    <option value="3">Dim Sum</option>
                                    <option value="4">Noodles</option>
                                    <option value="5">Junk Food</option>
                                    <option value="6">Hearty Meals</option>
                                    <option value="7">Snacks</option>
                                    <option value="8">Light Bites</option>
                                    <option value="9">Dim Sum</option>
                                    <option value="10">Noodles</option>
                                    <option value="11">Junk Food</option>
                                    <option value="12">Hearty Meals</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Description</Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.onChangeHandler(e, "description") }} type="text" placeholder="Description" name="description" value={this.state.fields["description"]} />
                                {this.state.errors.description ? <span style={{ color: 'red' }}>Please key in a Description</span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Duration</Form.Label>
                            <Col>
                                <Form.Control name="time_limit_min" as="select" defaultValue="90" disabled custom>
                                    <option value="90">1hour 30 mins</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <Button type="submit" onClick={() => this.fieldValidation()} className="mb-2">
                            Submit
                </Button>
                        <Col>
                            <Form.Control type="hidden" placeholder="Normal text" name="merchant_id" value={this.props.merchant_id} />
                        </Col>
                    </Form>
                </section>
            </div>
        )
    }

}

export default withRouter(CreateItem)