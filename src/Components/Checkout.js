import React from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import {useDispatch, useSelector} from 'react-redux';
import {placeOrder} from '../actions/orderAction'
import Loader from './Loader';
import Error from './Error';
import Success from './Success';
import { CartClear } from "../actions/orderAction";


function Checkout({subTotal}) {
    const orderState = useSelector((state) => state.placeOrderReducer)
    const {loading,error,success} = orderState
    const dispatch = useDispatch();
    const tokenHandler = (token) => {
      dispatch(placeOrder(token,subTotal));
      console.log(token);
    }
  return (
    <>
    {loading && (<Loader/>)}
    {error && (<Error error = "Something went wrong"/>)}
    {success && (<Success success = "Order Placed successfully "/>)}
     
    <StripeCheckout
    amount={subTotal * 100}
    shippingAddress
    token={tokenHandler}
    stripeKey="pk_test_51MTMHISJsofPLpG4dXSPILd6JteYd2woBOO2mTdGOPMR8q3VDMOdiiygqjFlyPf3IEXcS5iNuOYo9m81wvKr1iqj00Myzw4aNR"
    currency = "INR">
        <Button>Pay Now</Button>
        {
          success ? (dispatch(CartClear())) : ""
        }
        </StripeCheckout>
    </>
  )
}

export default Checkout