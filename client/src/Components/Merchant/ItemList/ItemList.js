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
        let category = {
            "1": "Snacks",
            "2": "Light Bites",
            "3": "Dim Sum",
            "4": "Noodles",
            "5": "Junk Food",
            "6": "Hearty Meals",
            "7": "Snacks",
            "8": "Light Bites",
            "9": "Dim Sum",
            "10": "Noodles",
            "11": "Junk Food",
            "12": "Hearty Meals"
        }

        let itemList = this.props.list.map((item, index) => {
            return <tr key={item.listing_id}>
                <td className="td">{item.item_name}</td>
                <td className="td">{item.unit_price}</td>
                <td className="td">{item.quantity}</td>
                <td className="td">{item.price_ceiling}</td>
                <td className="td">{item.price_floor}</td>
                <td className="td">{category[item.category_id]}</td>
                <td className="td">{item.description}</td>
                <td className="td">{item.time_limit_min}</td>
                <td className="td"><Toggle onToggle={this.toggleOnclickHandler} id={item.listing_id} boolean={item.live}></Toggle></td>
                <td className="td"><Link to={`/EditItem/${item.listing_id}`} ><EditIcon className="edit" /></Link></td>
            </tr>
        })
        return (
            <>
                <div id="backgroundMerc"></div>
                <section className="page-section  bg-trans" >
                    <table className="table">
                        <tr>
                            <th className="th">Item Name</th>
                            <th className="th">Unit Price</th>
                            <th className="th">Quantity</th>
                            <th className="th">Maximum Price</th>
                            <th className="th">Minimum Price</th>
                            <th className="th">Category</th>
                            <th className="th">Description</th>
                            <th className="th">Duration</th>
                            <th className="th">Status</th>
                            <th className="th">Edit Item</th>
                        </tr>
                        {itemList}
                    </table>
                </section>
            </>
        )
    }
}