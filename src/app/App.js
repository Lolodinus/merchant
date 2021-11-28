import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
  } from "react-router-dom";

import { Header } from "../components/header";
import { Main } from "../pages/main";
import { Bag } from "../pages/bag";
import { links } from "../const/pageLinks";

import style from './app.module.scss';


export const App = () => {
	return (
		<Router>
			<div className={ style.App }>
				<Header/>
				<Routes>
					<Route path={ links.main } exact element={ <Main/> } />
					<Route path={ links.bag } exact element={ <Bag/> } />
				</Routes>
			</div>
		</Router>
	);
}
