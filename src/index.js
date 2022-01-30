import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {
	BrowserRouter as Router
  } from "react-router-dom";

import { App } from './app';
import { store } from "./store/index";

import './index.css';


ReactDOM.render(
		<React.StrictMode>
  			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</React.StrictMode>,
	document.getElementById('root')
);

