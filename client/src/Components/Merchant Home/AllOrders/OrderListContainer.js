import React from 'react';

import OrderList from './OrderList';



class OrderListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            display: true
            // realDisplay :this.props.realDisplay, //for integration
        }

    }
//set state with props from parent: SEARCH
    static getDerivedStateFromProps(nextProps,prevState) {
        //mounting
        return {realDisplay: nextProps.query}
    }


    render(){

            if(this.state.display) {
                return(
                    <div>
                    <OrderList display={this.state.display}/>
                    </div>
                    )

            }


    }
}

export default OrderListContainer;