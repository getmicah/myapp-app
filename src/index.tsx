import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Cookies from 'js-cookie'

import * as AppConfig from '../config/config.dev.json'

export interface State {}

class App extends React.Component<null, State> {
	constructor() {
		super(null);
		this.state = {}
	}

	componentWillMount() {
		
	}

	render() {
		return(
			<div id='app-container'>
				<h1>Spotify webapp</h1>
			</div>
		);
	}
}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
);