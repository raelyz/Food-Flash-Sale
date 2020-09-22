
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
function Checkout(props) {
    const [notEnuff, setNotEnuff] = useState("none")
    const [result, setResult] = useState("none")
    const [loadingDisplay, setLoadingDisplay] = useState("none")
    const [loading, setLoading] = useState("Loading.")
    const [invalid, setInvalid] = useState("none")
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        setResult("none");
        setNotEnuff("none");
        setLoadingDisplay("none");
        setInvalid("none");
        // Block native form submission.
        event.preventDefault();
        setLoadingDisplay("block")
        setLoading("Loading. ")

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
            setLoadingDisplay("none")
            setInvalid("block")
            console.log('[error]', error);
        } else {
            setLoadingDisplay("block")
            console.log('[PaymentMethod]', paymentMethod);
            setLoading("Loading. .")
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
                .then(res => {
                    setLoading("Loading. . .")
                    return res.json()})
                .then(res => {
                    switch (res.status) {
                        case "Payment Complete": {
                            alert("Payment Successful! \n Click 'Ok' to continue.")
                            props.history.push("/")
                            break;
                        }
                        case "Payment Failed": {
                            setLoadingDisplay("none");
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
            <p style={{ display: loadingDisplay }} >{loading}</p>
            <p style={{ display: invalid, color: "red" }} >Invalid Card</p>
            <p style={{ display: result, color: "red" }} >Payment Failed</p>
            <p style={{ display: notEnuff, color: "red" }} >Insufficient Stock</p>
        </form>
    );
}

export default withRouter(Checkout)