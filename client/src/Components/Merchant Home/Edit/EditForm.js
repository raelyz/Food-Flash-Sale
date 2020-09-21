import React, { Component, useParams } from 'react'
import { withRouter } from 'react-router'
import { Form, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class EditForm extends Component {
    constructor(props) {
        super(props)
    }
    onSubmitHandler(e) {
        e.preventDefault()
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
    }

    render() {
        return (
            <Form action="/editlisting" method="post" onSubmit={(e) => this.onSubmitHandler(e)}>
                <Form.Row>
                    <Form.Label column lg={2}>Item Name</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder={this.props.item_name} name="item_name" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Unit Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder={this.props.unit_price} name="unit_price" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Quantity</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder={this.props.quantity} name="quantity" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Maximum Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder={this.props.price_ceiling} name="price_ceiling" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Minimum Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder={this.props.price_floor} name="price_floor" />
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
                        <Form.Control type="text" placeholder={this.props.description} name="description" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Duration</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder={this.props.time_limit} name="time_limit_min" />
                    </Col>
                </Form.Row>
                <Button type="submit" className="mb-2">
                    Submit
                </Button>
                <Col>
                    <Form.Control type="hidden" placeholder="Normal text" name="listing_id" value={this.props.listing_id}/>
                </Col>
            </Form>
        )
    }
}

export default withRouter(EditForm)