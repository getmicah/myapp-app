import * as React from "react"

import * as storage from "../utils/storage"

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
		console.log("accessToken:", this.state.accessToken)
		return(
			<main>
				{this.state.accessToken ? <User/> : <Home/>}
			</main>
		)
	}
}
