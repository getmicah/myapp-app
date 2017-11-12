import * as React from "react"
import * as ReactDOM from "react-dom"

import config from "./utils/config"
import router from "./utils/router"
import viewStore from "./stores/ViewStore"
import * as viewActions from "./actions/ViewActions"
import { User, UserJSON } from "./models/UserModel"
import * as userActions from "./actions/UserAction"

interface state {
	loaded: boolean
}

class App extends React.Component<null, state> {
	constructor() {
		super(null)
		this.state = {
			loaded: viewStore.get()
		}
	}

	updateView() {
		this.setState({
			loaded: viewStore.get()
		})
	}

	componentDidMount() {
		viewStore.on("change", this.updateView.bind(this))
		fetch(`${config.apiURL}/me`, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error();
				}
				return res.json()
			})
			.then((json: UserJSON) => {
				const user = new User(json)
				userActions.set(user)
				viewActions.show()
			}).catch((e) => {
				userActions.remove()
				viewActions.show()
			})
	}

	render() {
		return (
			<div id="app" className={this.state.loaded ? null : "hidden"}>
				{router()}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("app"))