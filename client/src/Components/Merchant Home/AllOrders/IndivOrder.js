import React from 'react';


const IndivOrder = (props) => {
    let d = new Date(props.date).toISOString().slice(0, 10)
    return (



        <tr className="IndivOrder">
            <td>{props.order_id}</td>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
            <td>{d}</td>
            <td>{props.revenue}</td>
        </tr>
    )
}

export default IndivOrder;

