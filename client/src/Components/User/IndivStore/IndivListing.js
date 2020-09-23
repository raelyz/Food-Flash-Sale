
import React from "react";

const IndivListing = (props) => {
  const addToCart = {
    name: props.item_name,
    price: props.discPrice,
    merchant_id: props.merchant_id,
    listing_id: props.listing_id,
    quantity: props.quantity,
  };

  return (

    <div className="IndivListing">
      <div id="background"></div>
      <img src="https://source.unsplash.com/-1GEAA8q3wk/300x300" alt="img" />
      <h4>{props.item_name}</h4>
      <p>quantity: {props.quantity}</p>
      <p>original price: {props.originalPrice}</p>
      <p>discount: {(props.discount * 100).toFixed(0)}%</p>
      <p>Final Price: {props.discPrice}</p>
      <button className="buttons btn-hover color-4"
        value={props.listing_id}
        name="add"
        onClick={(e) => {
          e.persist();
          props.onClick(e, addToCart);
        }}
      >
        Add to Basket <img src="https://res.cloudinary.com/dviuglhwb/image/upload/v1489676297/cart_t8m4la.svg" alt="" />
      </button>
      <button className="buttons btn-hover color-1"
        value={props.listing_id}
        name="del"
        onClick={(e) => {
          e.persist();
          props.onDel(e, addToCart);
        }}
      >
        Reduce
      </button>
    </div>
  );
};

export default IndivListing;

