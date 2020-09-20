import React, { Component } from 'react'
import Toggle from './Toggle/Toggle'
import EditIcon from '@material-ui/icons/Edit';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import EditContainer from '../../Merchant Home/Edit/EditContainer'
export default class ItemList extends Component {
    constructor() {
        super()
        this.state = {
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
    render() {
        // console.log(this.state.list)
        let itemList = this.props.list.map((item, index) => {
            return <tr key={item.listing_id}>
                <td>{item.item_name}</td>
                <td>{item.unit_price}</td>
                <td>{item.quantity}</td>
                <td>{item.price_ceiling}</td>
                <td>{item.price_floor}</td>
                <td>{item.category_id}</td>
                <td>{item.description}</td>
                <td>{item.time_limit_min}</td>
                <td><Toggle onToggle={this.toggleOnclickHandler} id={item.listing_id} boolean={item.live}></Toggle></td>
                <td><Link to={`/EditItem/${item.listing_id}`} ><EditIcon className="edit" /></Link></td>
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
                    <th>Edit Item</th>
                </tr>
                {itemList}
            </table>

        )
    }
}
