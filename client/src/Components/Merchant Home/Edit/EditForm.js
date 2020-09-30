import React, { Component, useParams } from 'react'
import { withRouter } from 'react-router'
import { Form, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {
            }, errors: {}, validation: {},

        }
        this.item_name = React.createRef();
        this.unit_price = React.createRef()
        this.quantity = React.createRef()
        this.price_ceiling = React.createRef()
        this.price_floor = React.createRef()
        this.description = React.createRef()
        this.time_limit_min = React.createRef()
    }

    fieldValidation(e) {
        console.log(this)
        let fields = this.state.fields;
        let errors = {};
        let dataValidity = true;

        if (!this.item_name.current.value) {
            console.log(this.item_name)
            dataValidity = false;
            errors["item_name"] = "Cannot be Empty"
        }
        if (typeof fields["item_name"] !== "undefined") {
            if (!fields["item_name"].match(/^[a-zA-Z]+$/)) {
                dataValidity = false;
                errors["item_name"] = "Only letters";
            }
        }
        if (!this.unit_price.current.value) {
            dataValidity = false;
            errors["unit_price"] = "Cannot be Empty"
        }
        if (typeof fields["unit_price"] !== "undefined") {
            if (isNaN(fields["unit_price"]) || parseInt(fields["unit_price"]) < 0) {
                dataValidity = false;
                errors["unit_price"] = "Only Numbers";
            }
        }
        if (!this.quantity.current.value) {
            dataValidity = false;
            errors["quantity"] = "Cannot be Empty"
        }
        if (typeof fields["quantity"] !== "undefined") {
            if (isNaN(fields["quantity"]) || parseInt(fields["quantity"]) < 0) {
                dataValidity = false;
                errors["quantity"] = "Only Numbers";
            }
        }
        if (!this.price_ceiling.current.value) {
            dataValidity = false;
            errors["price_ceiling"] = "Cannot be Empty"
        }
        if (typeof fields["price_ceiling"] !== "undefined") {
            if (isNaN(fields["price_ceiling"]) || parseInt(fields["price_ceiling"]) < 0) {
                dataValidity = false;
                errors["price_ceiling"] = "Only Numbers";
            }
        }
        if (!this.price_floor.current.value) {
            dataValidity = false;
            errors["price_floor"] = "Cannot be Empty"
        }
        if (typeof fields["price_floor"] !== "undefined") {
            if (isNaN(fields["price_floor"]) || parseInt(fields["price_floor"]) < 0) {
                dataValidity = false;
                errors["price_floor"] = "Only Numbers";
            }
        }
        if (!this.description.current.value) {
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
    onChangeHandler = (e, field) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({
            fields
        });
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
                listing_id: e.target.listing_id.value
            }
            fetch('/editlisting', {
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
                    <Form action="/editlisting" method="post" onSubmit={(e) => this.onSubmitHandler(e)}>
                        <Form.Row>
                            <Form.Label column lg={2}>Item Name</Form.Label>
                            <Col>
                                <Form.Control onKeyUp={(e) => this.onChangeHandler(e, "item_name")} type="text" placeholder={this.props.item_name} name="item_name" ref={this.item_name} defaultValue={this.props.item_name} />
                                {this.state.errors.item_name ? <span style={{ color: 'red' }}>Text</span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Unit Price</Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.onChangeHandler(e, "unit_price") }} type="text" placeholder={this.props.unit_price} name="unit_price" ref={this.unit_price} defaultValue={this.props.unit_price} />
                                {this.state.errors.unit_price ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                                {this.state.errors.algorithm_error ? <span style={{ color: 'red' }}>Unit Price &#62;  Max Price &#62; Min Price </span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Quantity</Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.onChangeHandler(e, "quantity") }} type="text" placeholder={this.props.quantity} name="quantity" ref={this.quantity} defaultValue={this.props["quantity"]} />
                                {this.state.errors.quantity ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Maximum Price</Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.onChangeHandler(e, "price_ceiling") }} type="text" placeholder={this.props.price_ceiling} name="price_ceiling" ref={this.price_ceiling} defaultValue={this.props["price_ceiling"]} />
                                {this.state.errors.price_ceiling ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                                {this.state.errors.algorithm_error ? <span style={{ color: 'red' }}>Unit Price &#62;  Max Price &#62; Min Price </span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Minimum Price</Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.onChangeHandler(e, "price_floor") }} type="text" placeholder={this.props.price_floor} name="price_floor" ref={this.price_floor} defaultValue={this.props["price_floor"]} />
                                {this.state.errors.price_floor ? <span style={{ color: 'red' }}>+ve Numbers Only</span> : null}
                                {this.state.errors.algorithm_error ? <span style={{ color: 'red' }}>Unit Price &#62;  Max Price &#62; Min Price </span> : null}
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>Category</Form.Label>
                            <Col>
                                <Form.Control name="category_id" as="select" defaultValue={this.props.category_id} custom>
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
                                <Form.Control onChange={(e) => { this.onChangeHandler(e, "description") }} type="text" placeholder={this.props.description} name="description" ref={this.description} defaultValue={this.props["description"]} />
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
                            <Form.Control type="hidden" placeholder="Normal text" name="listing_id" value={this.props.listing_id} />
                        </Col>
                    </Form>
                </section>
            </div >
        )
    }
}

export default withRouter(EditForm)

