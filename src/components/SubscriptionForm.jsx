import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const SubscriptionForm = props => {
  const dispatch = useDispatch()
  const { email } = useSelector(state => state.currentUser)
  const submitPayment = async (event) => {
    event.preventDefault()
    let stripeResponse = await props.stripe.createToken()
    let token = stripeResponse.token.id
    let paymentStatus = await axios.post('http://localhost:3000/api/subscriptions', { stripeToken: token, email: email })
    if (paymentStatus.data.status === 'paid') {
      dispatch({
        type: 'FLASH_MESSAGE',
        payload: {
          flashMessage: "Thank you for your business!",
          showSubscriptionForm: false,
          currentUser: { role: 'subscriber' }
        }
      })
      dispatch({ type: 'HIDE_ARTICLE' })
    }
  }
  return (
    <form id="subscription-form">
      <label>CC Number</label>
      <CardNumberElement id="cardnumber" />

      <label>Expiry Date</label>
      <CardExpiryElement id="exp-date" />

      <label>CVC</label>
      <CardCVCElement id="cvc" />

      <button
        onClick={(event) => submitPayment(event)}
      >
        Submit payment
      </button>
    </form>
  )
}

export default injectStripe(SubscriptionForm)
