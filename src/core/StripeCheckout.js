import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cardHelper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend'
import {createOrder} from "./helper/orderHelper"
const { v4: uuidv4 } = require('uuid');

const StripeCheckout = ({
    products, 
    setReload= f => f ,
    reload= undefined
    }) => {
  
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const tokenASILI = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    // const getFinalPrice = () => {
    //     return products.reduce((currentValue, nextValue) => {
    //         return currentValue + nextValue.count + nextValue;
    //     },0);
    // };

    const getFinalAmount = () => {
        let amount = 0 ;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    }

    const makePayment = token => {
        // console.log("NOT THE TOKENASILI",token)
        const body = { 
            token,
            products
        }

        const headers = {
            "Content-type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: 'POST',
            headers,
            body:JSON.stringify(body)
        }).then(response =>{ 
            //console.log("THE RESPONSEE is",response);
            //call further methods
            const orderData = {
                products : products,
                transaction_id: token.card.id,
                amount: getFinalAmount(),
            }
            //console.log("initialing to save the order");
            createOrder(userId,tokenASILI,orderData);
            cartEmpty(() => {
                console.log("Emptying Cart");
            });
            setReload(!reload)
            }).catch(err => console.log(err))
    };

    const showStripeButton = () => {
        // console.log(getFinalAmount());
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey= "pk_test_51MRsFTSE2ExuA5JfEUWG9dG4ZDXA0XkCBV94kJJ2q8ef8tmkZ5ia5FEewfLNimCkW3qa4sL2y8flQXNwu1HG8LKx00JXUxcpHX"
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Buy TShirts"
            shippingAddress
            billingAddress
            >
                <button className='btn btn-success'>Pay with Stripe</button>
            </StripeCheckoutButton>
        )  : (
            <Link to={"/signin"}>
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    };

    return (
    <div className='text-center'>
        <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
        {showStripeButton()}
    </div>
  )
}

export default StripeCheckout;



// cartEmpty(() => {
//     console.log("Did we got a crash");
// }) && setReload(!reload)