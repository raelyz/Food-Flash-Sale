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

//set state with props from parent: SEARCH
    static getDerivedStateFromProps(nextProps,prevState) {
        //mounting
        return { sort: nextProps.sort}
    }

    componentDidMount() {
        //mounting
        if(this.props.display) {
        fetch("/merchantorders/"+this.state.merchant_id)
        .then(res => res.json())
        .then(res => {
            if(res.length < 1){
                this.setState({html: 'You have no orders yet'})
            } else {
                let formattedResult = this.format(res);
                this.setState({ordersResult: res, html:formattedResult})
            }
        })
        .catch(error => {
        console.log("error happened--- at GET MERCHANT ORDER MOUNT", error.message)
    });
    }
    }

    //force the page to re-render
    componentDidUpdate (prevProps) {
        if(prevProps.sort !== this.props.sort){
            this.sortMe(this.state.ordersResult, this.state.sort)
            let sortedhtml = this.format(this.state.ordersResult);
            this.setState({html: sortedhtml})
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

   // sorts results based on selected category

sortMe(array,category){
    switch(category){
        case "name":
        array.sort((a,b)=>{
            return(b.item_name > a.item_name) ? 1: -1
        })
        break;
    case "revenue":
        array.sort((a,b)=>{
            return(b.revenue > a.revenue) ? 1: -1
        })
        break;

    default:
            return array;

    }
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