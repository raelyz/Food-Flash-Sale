import React from 'react';
import IndivOrder from './IndivOrder'




class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            searchResult:[], //result from API
            ordersResult:[],
            merchant_id: 1,
            html:""
        }
        this.format = this.format.bind(this);
    }


    componentDidMount() {
        //mounting
        if(this.props.display) {
        fetch("/getMerchantOrders",{
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({merchant_id: this.state.merchant_id})
        })
        .then(res => res.json())
        .then(res => {
            if(res.length < 1){
                this.setState({html: 'No matching search results. try another term?'})
            } else {
                let formattedResult = this.format(res);
                this.setState({result: res, html:formattedResult})
            }
        })
        .catch(error => {
        console.log("error happened--- at GET MERCHANT ORDER MOUNT", error.message)
    });
    }
    }

//take the res.json and convert into nice HTML
format(array) {
    return array.map((item,index)=>{
        let order_id = item.order_id;
        let price = item.price;
        let quantity= item.quantity;
        let name = item.item_name;
        let date = item.date_created;
        let revenue = item.revenue;

        return <IndivOrder order_id={order_id} price={price} quantity={quantity} name={name} date={date} revenue ={revenue}  key={index} />
    })
}

    render(){
        return (
            <div>
            {this.state.html}
            </div>

            )
    }
}

export default OrderList;