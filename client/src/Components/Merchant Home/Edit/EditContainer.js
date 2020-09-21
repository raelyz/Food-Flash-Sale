import React from 'react';
import EditForm from './EditForm'
import { useParams } from 'react-router-dom'

class EditContainer extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.list)
        // let filteredList = this.props.list.filter((item)=> {
        //     return item.listing_id == this.props.match.params.listing_id
        // })
        this.state = {
            displayEdit: true,
            listing_id: this.props.match.params.listing_id,// later change to this.props.listing_id
            item_name: "",
            unit_price: "",
            quantity: "",
            price_ceiling: "",
            price_floor: "",
            category_id: "",
            merchant_id: "",
            description: "",
            time_limit_min: ""
        }
    }
    componentDidMount() {
        let filteredList = this.props.list.filter((item) => {
            return item.listing_id == this.props.match.params.listing_id
        })
        // console.log(filteredList, "--------filtered list")
        this.setState({
            displayEdit: true,
            listing_id: this.props.match.params.listing_id,// later change to this.props.listing_id
            item_name: filteredList[0].item_name,
            unit_price: filteredList[0].unit_price,
            quantity: filteredList[0].quantity,
            price_ceiling: filteredList[0].price_ceiling,
            price_floor: filteredList[0].price_floor,
            category_id: filteredList[0].category_id,
            merchant_id: filteredList[0].merchant_id,
            description: filteredList[0].description,
            time_limit_min: filteredList[0].time_limit_min,
        })
    }
    render() {
        return (
            <div>
            <EditForm item_name={this.state.item_name} listing_id={this.props.match.params.listing_id} unit_price={this.state.unit_price} quantity={this.state.quantity} price_ceiling={this.state.price_ceiling} price_floor={this.state.price_floor} category_id={this.state.category_id} merchant_id={this.props.merchant_id} description={this.state.description} time_limit_min={this.state.time_limit_min} onClick={this.props.onClick}/>
            </div>
        )
    }
}
export default EditContainer;