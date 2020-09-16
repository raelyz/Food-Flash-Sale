import React, { Component } from 'react'


export default class OrderHistory extends Component {
    constructor() {
        super()
        this.state = {
            orderHistory: [],
            fetch: false
        }
    }

    componentDidMount() {
        fetch('/orderhistory')
            .then((res) => res.json())
            .then(res => this.setState({
                orderHistory: res,
                fetch: true
            }))
    }

    componentWillUnmount() {
        this.setState({
            fetch: false
        })
    }
    render() {

        const orderHistory = this.state.orderHistory.map((orderHistory, index) => {
            return (<div>
                <div key={index}>{orderHistory.receipt_id}
                    {orderHistory.name} {orderHistory.cuisine}</div>
                <button onClick={(e) => { }}
                />
            </div>)
        })

        return (
            <div className='orderHistoryWrapper'>
                {/* {orderHistory} */}
                {this.state.fetch ? orderHistory : null}
            </div>
        )

    }
}
