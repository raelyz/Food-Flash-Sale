
import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function Checkout(props) {
    const [notEnuff, setNotEnuff] = useState("none")
    const [result, setResult] = useState("none")
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            fetch('/submitOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    card: paymentMethod,
                    order: props.data
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    switch (res.status) {
                        case "Payment Complete": {

                        }
                        case "Payment Failed": {
                            setResult("block");
                            break;
                        }
                        case "Insufficient Inventory": {
                            setNotEnuff("block")
                            break;
                        }


                    }
                })
        }
    };

    return (
        <form style={{ maxWidth: "500px", margin: "0 auto" }} onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
        </button>
            <p style={{ display: result, color: "red" }} >Payment Failed</p>
            <p style={{ display: notEnuff, color: "red" }} >Insufficient Stock</p>
        </form>
    );

}
