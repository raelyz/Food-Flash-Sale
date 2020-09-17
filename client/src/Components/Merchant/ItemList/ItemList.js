import React, { Component } from 'react'
import Toggle from './Toggle/Toggle'

export default class ItemList extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            fetch: false
        }
    }
    toggleOnclickHandler = (boolean, id) => {
        fetch('/togglelisting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ listing_id: id, boolean: boolean })
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res)
                this.setState({
                    fetch: !this.state.fetch
                })
            })
    }

    componentDidMount() {
        fetch('/all/listing/2')
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.setState({
                    list: res
                })
            })
    }

    render() {
        // console.log(this.state.list)
        let itemList = this.state.list.map((item, index) => {
            return <tr>
                <td>{item.item_name}</td>
                <td>{item.unit_price}</td>
                <td>{item.quantity}</td>
                <td>{item.price_ceiling}</td>
                <td>{item.price_floor}</td>
                <td>{item.category_id}</td>
                <td>{item.description}</td>
                <td>{item.time_limit_min}</td>
                <td><Toggle onToggle={this.toggleOnclickHandler} id={item.listing_id} boolean={item.live}></Toggle></td>
            </tr>
        })

        return (
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Maximum Price</th>
                    <th>Minimum Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Status</th>
                </tr>
                {itemList}
            </table>


        )
    }
}
