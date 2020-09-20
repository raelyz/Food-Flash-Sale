import React from 'react';

export default class Basket extends React.Component {

    render() {
        const cartItems = this.props.cart;

        return (
            <>
                <div>
                    {cartItems.length === 0 ? "Basket is Empty" : <div> You have{cartItems.length} items in your basket </div>}
                </div>
                <div>
                    {cartItems.length > 0 ? <ul>{cartItems.map((item, index) => {
                        return <li key={index}>Item:{item.name}
            x {item.count / 2} Price: {item.price} <button
                                onClick={(e) => {
                                    e.persist()
                                    this.props.handleRemoveFromCart(e, item)
                                }}>
                                Delete</button>

                        </li>
                    })}</ul> : <div>Start adding items!</div>}
                </div>
            </>
        )
    }
}