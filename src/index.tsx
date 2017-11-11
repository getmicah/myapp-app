import * as React from "react"
import * as ReactDOM from "react-dom"

import * as storage from "./utils/storage"
import router from "./router"

interface State {
	accessToken: string
}

class App extends React.Component<null, State> {
	constructor() {
		super(null)
		this.state = {
			accessToken: null
		}
	}

	componentWillMount() {
		storage.checkLocalStorage((accessToken) => {
			if (accessToken) {
				this.setState({accessToken})
				return
			}
		})
		storage.checkCookies((accessToken) => {
			if (accessToken) {
				this.setState({accessToken})
				return
			}
		})
	}

	render() {
		return (
			<div id="app">
				{router(window.location.pathname, this.state.accessToken)}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("app"))