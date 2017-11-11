import * as React from "react"
import * as ReactDOM from "react-dom"

import Config from "./config"
import Main from "./components/Main"
import NotFound from "./components/NotFound"

export function router() {
	const path = window.location.pathname
	console.log(path)
	switch (path) {
		case "/":
			return <Main/>
		default:
			return <NotFound/>
	}
}
const App = () => {
	return (
		<div id="app">
			{router()}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById("app"))