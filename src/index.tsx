import * as React from "react"
import * as ReactDOM from "react-dom"

import config from "./utils/config"
import router from "./utils/router"
import userStore from "./stores/UserStore"
import { User, UserJSON } from "./models/UserModel"
import * as userActions from "./actions/UserActions"

interface state {
	showApp: boolean
}

class App extends React.Component<null, state> {
	constructor() {
		super(null)
		this.state = {
			showApp: false
		}
	}

	updateView() {
		this.setState({
			showApp: true
		})
	}

	fetchUser() {
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
				userActions.set(new User(json))
			}).catch((e) => {
				userActions.remove()
			})
	}

	componentDidMount() {
		userStore.on("change", this.updateView.bind(this))
		this.fetchUser()
	}

	render() {
		return (
			<div id="app" className={this.state.showApp ? null : "hidden"}>
				{router()}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("app"))