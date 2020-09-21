import React from 'react';
import Sort from './Sort';
import OrderList from './OrderList';



class OrderListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            display: true,
            sort: "default"
            // realDisplay :this.props.realDisplay, //for integration
        }

    }
//set state with props from parent: SEARCH
    static getDerivedStateFromProps(nextProps,prevState) {
        //mounting
        return {realDisplay: nextProps.query}
    }
     //on change handler for select SORT
onChangeSort = (event) =>{
    let filter = event.target.value;
    this.setState({sort:filter})
}


    render(){

            if(this.state.display) {
                return(
                    <div>
                    <Sort onChange={this.onChangeSort} optionChoice={this.state.sort}/>
                    <OrderList display={this.state.display} sort={this.state.sort} merchant_id={this.props.merchant_id}/>

                    </div>
                    )

            }


    }
}

export default OrderListContainer;