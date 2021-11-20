import React from 'react';

import { Main } from "../pages/main";

import style from './app.module.scss';


export const App = () => {
	return (
		<div className={ style.App }>
			<Main/>
		</div>
	);
}
