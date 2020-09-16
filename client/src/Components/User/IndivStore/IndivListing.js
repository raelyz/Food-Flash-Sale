import React from 'react';


const IndivListing = (props) => {

    const addToCart = {name:props.item_name,price: props.discPrice} ;

    return (

        <div className="IndivListing">
        <img src="https://source.unsplash.com/-1GEAA8q3wk/100x100"alt="img"/>
        <h4>{props.item_name}</h4>
        <p>quantity: {props.quantity}</p>
        <p>original price: {props.originalPrice}</p>
        <p>discount: {props.discount}</p>
        <p>Final Price: {props.discPrice}</p>
        <button value ={props.listing_id} name='add' onClick={(e)=>{
                    e.persist()
                    props.onClick (e,addToCart)


                }}>Add to Cart</button>
        </div>
        )
}

export default IndivListing