import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
  } from "react-router-dom";

import { News, Bag, Trade, Error, NotFound } from "../pages";
import { Header, Navbar, PopUp, GameOver } from "../components";
import { useEvent, useNews } from '../hooks';
import { links } from "../const/pageLinks";
import { gameActions } from "../store/game";

import style from './app.module.scss';


export const App = () => {
    const dispatch = useDispatch();
    const [popUpGameOver, openPopUpGameOver] = useState(false);
    const { gameOver, money, event } = useSelector((store) => store.game);
	
	useEvent(event);
    useNews(event);

	useEffect(() => {
        if (!gameOver && money <= -100 ) {
            dispatch(gameActions.gameOver());
        }
	}, [dispatch, gameOver, money])

	useEffect(() => {
		if (gameOver) {
			openPopUpGameOver(true);
		} else {
			openPopUpGameOver(false);
		}
	}, [gameOver])

	return (
		<div className={ style.App }>
			<Header/>
			<Navbar/>
			<Routes>
				<Route path={ links.main } exact element={ <Navigate to={ links.news } /> } />
				<Route path={ links.news } exact element={ <News/> } />
				<Route path={ `${links.trade}/*` } element={ <Trade/> } />
				<Route path={ links.bag } exact element={ <Bag/> } />
				<Route path={ links.error } exact element={ <Error/> } />
				<Route path="*" exact element={ <NotFound/> } />
			</Routes>
			<PopUp children={ <GameOver/> } active={ popUpGameOver } />
		</div>
	);
}
