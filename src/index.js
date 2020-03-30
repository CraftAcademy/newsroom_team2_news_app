import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import axios from "axios";
import { StripeProvider } from 'react-stripe-elements'

axios.defaults.baseURL = "http://localhost:3000/api/";
// axios.defaults.baseURL = "https://urban-living.herokuapp.com/api/";


const store = configureStore();
window.store = store;


ReactDOM.render(
	<Provider store={store}>
		<StripeProvider apiKey='pk_test_QicERB8w3kyqaYW3hUUQylRH'>
			<App />
		</StripeProvider>
	</Provider>, document.getElementById('root'));

serviceWorker.unregister();

if (window.Cypress) {
	window.store = store
}
