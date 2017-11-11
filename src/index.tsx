import * as React from "react"
import * as ReactDOM from "react-dom"

import router from "./utils/router"
import * as storage from "./utils/storage"
import * as tokenActions from "./actions/TokenActions"

class App extends React.Component {
	componentDidMount() {
		storage.loadLocalStorage((value) => {
			if (value) {
				return tokenActions.setAccessToken(value)
			}
		})
		storage.loadCookies((value) => {
			if (value) {
				return tokenActions.setAccessToken(value)
			}
		})
	}

	render() {
		return (
			<div id="app">
				{router()}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("app"))