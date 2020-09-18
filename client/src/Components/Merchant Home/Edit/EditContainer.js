import React from 'react';
import EditForm from './EditForm'


class EditContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            displayEdit: true,
            listing_id:1,// later change to this.props.listing_id
              item_name: "Hawaiian Pizza",
              unit_price:10,
              quantity:10,
              price_ceiling:8,
              price_floor:5,
              category_id:1,
              merchant_id:6,
              description:"Either you hate or u love",
              time_limit_min:120,
        }

    }






    render(){
        return (
            <div>
            <EditForm listing_id={this.state.item_name} unit_price={this.state.unit_price} quantity={this.state.quantity} price_ceiling={this.state.price_ceiling} price_floor={this.state.price_floor} category_id={this.state.category_id} merchant_id={this.props.merchant_id} description={this.state.description} time_limit_min={this.state.time_limit_min}/>
            </div>

            )
    }
}

export default EditContainer;