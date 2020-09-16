import React from 'react';
import IndivListing from './IndivListing';
import Basket from './Basket';



export default class ListingContainer extends React.Component {
    constructor(props){
        //mounting
        super(props)
        console.log("----inside Listing constructor")

        this.state = {
            merchant_id: props.merchant_id,
            merchant_name: "",
            merchant_img: "",
            html: [],
            result: [],
            cart: [],
            viewCart: false
        }

        this.addToCart = this.addToCart.bind(this);
        this.navigateTo = this.navigateTo.bind(this)
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)

    }

//payment click handlling
//delete from cart
handleRemoveFromCart(e,item){
    this.setState(state=>{
        const cart = state.cart.filter(element=> element.name != item.name);
        localStorage.setItem('cart',cart);
        return {cart}
    })
}


//add to cart button
addToCart(e,addToCart){
    console.log(addToCart)
    this.setState((prevState)=>
        ({cart:[...prevState.cart,addToCart]}))
}

// view cart button
navigateTo(){
    this.setState({viewCart:true})
}

handleAddToCart(e,product){
    console.log(product)

    this.setState(state=>{
        const cart = state.cart;
        let productAlreadyInCart = false;
        cart.forEach(item =>{
            if(item.name===product.name){
                productAlreadyInCart=true;
                item.count ++;
            }
        });
        if(!productAlreadyInCart){
            cart.push({...product,count:1})
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        return cart;
    })
}


//when state is changed, FETCH results from aPI
//side effects ie: HTTP requests are allowed here
    componentDidMount() {
        fetch("/indivshop/1")
        .then(res => res.json())
        .then(res =>
                this.setState({result: res, html:this.format(res),merchant_name: res[0].name})
        )
    }




//helper functions

//take the res.json and convert into nice HTML
format(array) {
    return array.map((item,index)=>{
        let item_name = item.item_name;
        let quantity = item.quantity;
        let discPrice = item.price_ceiling;
        let originalPrice =item.unit_price;
        let discount = (originalPrice-discPrice)/originalPrice
        let merchant_name = item.name;
        let cuisine = item.cuisine;
        let listing_id = item.listing_id;

        return <div key={index}>
        <IndivListing item_name={item_name} quantity={quantity} discPrice ={discPrice} originalPrice={originalPrice} discPrice={discPrice}discount={discount} merchant_name={merchant_name} cuisine={cuisine}  onClick ={this.handleAddToCart}/>

        </div>
    })
}




    render(){


        if(this.state.viewCart){
            return (
            <div>
            <Basket cart={this.state.cart} handleRemoveFromCart={this.handleRemoveFromCart}/>
            <button onClick={this.navigateTo}>View Cart {this.state.cart.length}</button>
                <h1>You are viewing deals from {this.state.merchant_name}</h1>
                <br/>

                <div className="ListItems" >
                {this.state.html}
                </div>
                </div>
                )

        }else{
            return (
            <>
            <button onClick={this.navigateTo}>View Cart {this.state.cart.length}</button>
                <h1>You are viewing deals from {this.state.merchant_name}</h1>
                <br/>

                <div className="ListItems" >
                {this.state.html}
                </div>

            </>
            )
    }
}
}