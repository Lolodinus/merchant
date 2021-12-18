import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
import { PopUp } from "../components/popUp";
import { links } from "../const/pageLinks";
import { gameActions } from "../store/game";
import { GameOver } from "../components/gameOver"

import style from './app.module.scss';


export const App = () => {
    const dispatch = useDispatch();
    const [popUpGameOver, openPopUpGameOver] = useState(false);
    const { gameOver, money } = useSelector((store) => store.game);

	useEffect(() => {
        if (!gameOver && money <= -100 ) {
            dispatch(gameActions.gameOver());
        }
	}, [dispatch, gameOver, money])

	useEffect(() => {
		if (gameOver) {
			openPopUpGameOver(true)
		} else {
			openPopUpGameOver(false)
		}
	}, [gameOver])

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
				<PopUp children={ <GameOver/> } active={ popUpGameOver } />
			</div>
		</Router>
	);
}
