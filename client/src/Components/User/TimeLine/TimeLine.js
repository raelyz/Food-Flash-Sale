import React, { Component } from 'react'
import EachMerchant from './EachMerchant/EachMerchant'

export default class TimeLine extends Component {

    constructor() {
        super()
        this.state = {
            timeLine: []
        }

    }




    componentDidMount() {
        fetch('/timeline')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    timeLine: res
                })
            })
    }

    render() {
        const merchantCard = this.state.timeLine.map((eachCard, index) => {
            const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100

            return <>
                <EachMerchant key={index} duration={eachCard.time_limit_min} time={eachCard.time}>
                    <div>{eachCard.name}</div>
                    <div>up to{discount}%</div>
                </EachMerchant>
            </>
        })
        return (
            <div>
                {merchantCard}
            </div >
        )
    }
}
