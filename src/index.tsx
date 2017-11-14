import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Main from "./components/Main"
import Header from "./components/Header"
import NotFound from "./components/NotFound"

const App: React.StatelessComponent<null> = () => {
	return (
		<div id="app">
			<Header />
			<Main />
		</div>
	)
}

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById("root"))