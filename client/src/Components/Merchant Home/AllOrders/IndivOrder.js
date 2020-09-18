import React from 'react';


const IndivOrder = (props) => {
    return (



        <div className="IndivOrder">
        <h1>Order ID: {props.order_id}</h1>
        <h4>{props.name}</h4>
        <p>quantity: {props.quantity}</p>
        <p>date: {props.date}</p>
        <p>revenue: {props.revenue}</p>

        </div>
        )
}

export default IndivOrder;