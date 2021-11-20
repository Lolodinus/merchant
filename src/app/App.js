import React from 'react';

import { Header } from "../components/header";
import { Main } from "../pages/main";

import style from './app.module.scss';


export const App = () => {
	return (

		<div className={ style.App }>
			<Header/>
			<Main/>
		</div>
	);
}
