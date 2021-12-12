import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
  } from "react-router-dom";

import { Header } from "../components/header";
import { Bag } from "../pages/bag";
import { News } from "../pages/news";
import { Trade } from "../pages/trade";
import { Navbar } from "../components/navbar"
import { links } from "../const/pageLinks";

import style from './app.module.scss';


export const App = () => {
	return (
		<Router>
			<div className={ style.App }>
				<Header/>
				<Navbar/>
				<Routes>
					<Route path={ links.main } exact element={ <Navigate to={ links.news } /> } />
					<Route path={ links.news } exact element={ <News/> } />
					<Route path={ `${links.trade}/*` } element={ <Trade/> } />
					<Route path={ links.bag } exact element={ <Bag/> } />
				</Routes>
			</div>
		</Router>
	);
}
