import * as React from "react"

import tokenStore from "../stores/TokenStore"
import Home from "./Home"
import User from "./User"

interface state {
	accessToken: string
}

export default class Main extends React.Component<null, state> {
	constructor() {
		super(null)
		this.state = {
			accessToken: null
		}
	}

	updateAccessToken() {
		this.setState({
			accessToken: tokenStore.getAccessToken()
		})
	}

	componentWillMount() {
		tokenStore.on("change", this.updateAccessToken.bind(this))
	}
	
	render() {
		return(
			<main>
				{this.state.accessToken ? <User/> : <Home/>}
			</main>
		)
	}
}
