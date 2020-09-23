import React from 'react';


const IndivOrder = (props) => {

    let d = new Date(props.date).toISOString().slice(0, 10)
    return (



        <tr >
            <td className="td">{props.order_id}</td>
            <td className="td">{props.name}</td>
            <td className="td">{props.quantity}</td>
            <td className="td">{d}</td>
            <td className="td">{props.revenue}</td>
        </tr>

    )
}

export default IndivOrder;

