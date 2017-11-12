import * as React from "react"

import userStore from "../stores/UserStore"
import { User } from "../models/UserModel"

import Home from "./Home"
import Feed from "./Feed"

interface state {
	user: User
}

export default class Main extends React.Component<null, state> {
	constructor() {
		super(null)
		this.state = {
			user: userStore.getUser()
		}
	}

	updateAccessToken() {
		this.setState({
			user: userStore.getUser()
		})
	}

	componentWillMount() {
		userStore.on("change", this.updateAccessToken.bind(this))
	}
	
	render() {
		return(
			<main>
				{this.state.user ? <Feed user={this.state.user}/> : <Home/>}
			</main>
		)
	}
}
