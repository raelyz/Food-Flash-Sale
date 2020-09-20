import React, { useState } from 'react';


const IndivListing = (props) => {

    const addToCart = { name: props.item_name, price: props.discPrice, merchant_id: props.merchant_id, listing_id: props.listing_id };

    return (

        <div className="IndivListing">
            <img src="https://source.unsplash.com/-1GEAA8q3wk/100x100" alt="img" />
            <h4>{props.item_name}</h4>
            <p>quantity: {props.quantity}</p>
            <p>original price: {props.originalPrice}</p>
            <p>discount: {(props.discount * 100).toFixed(0)}%</p>
            <p>Final Price: {props.discPrice}</p>
            <button value={props.listing_id} name='add' onClick={(e) => {

                e.persist()

                props.onClick(e, addToCart)



            }}>Add to Cart</button>
        </div>
    )
}

export default IndivListing