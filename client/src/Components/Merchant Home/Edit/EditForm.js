import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class EditForm extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Form action="/editlisting" method="post">
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
                        <Form.Control type="text" placeholder={this.props.category_id} />
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
                    <Form.Control type="hidden" placeholder="Normal text" name="{this.props.merchant_id}" />
                </Col>
            </Form>

        )
    }
}