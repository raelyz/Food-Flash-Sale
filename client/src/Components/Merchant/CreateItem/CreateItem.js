import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreateItem extends Component {
    constructor() {
        super()
    }


    render() {
        return (
            <Form action="/newListing" method="post">
                <Form.Row>
                    <Form.Label column lg={2}>Item Name</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Item Name" name="item_name" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Unit Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Unit Price" name="unit_price" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Quantity</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Quantity" name="quantity" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Maximum Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="maximum price" name="price_ceiling" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Minimum Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="minimum price" name="price_floor" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Category</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Normal text" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Description</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Description" name="description" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Duration</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Time in Minutes" name="time_limit_min" />
                    </Col>
                </Form.Row>
                <Button type="submit" className="mb-2">
                    Submit
                </Button>
                <Col>
                    <Form.Control type="hidden" placeholder="Normal text" name="merchant_id" />
                </Col>
            </Form>

        )
    }
}
