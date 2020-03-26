import React from 'react'
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe
} from "react-stripe-elements";

const SubscriptionForm = () => {
	const submitPayment = (event) => {
		debugger
	}
	return (
		<form id="subscription-form">
			<h1>FORM!</h1>
			<label>CC Number</label>
			<CardNumberElement />
			<label>Expiry Date</label>
			<CardExpiryElement />
			<label>CVC</label>
			<CardCVCElement />
			<button
			onClick={(event)=> submitPayment(event)}
			>Submit payment</button>
		</form>

	)
}

export default injectStripe(SubscriptionForm)
