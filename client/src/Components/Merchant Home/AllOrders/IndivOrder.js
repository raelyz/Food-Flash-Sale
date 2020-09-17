import React from 'react';


const IndivOrder = (props) => {
    return (
<IndivOrder order_id={order_id} price={price} quantity={quantity} name={name} date={date} revenue ={revenue}  key={index} />


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