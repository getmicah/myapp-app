import * as React from "react"

import config from "../utils/config"
import userStore from "../stores/UserStore"
import { User } from "../models/UserModel"

import Home from "./Home"
import Feed from "./Feed"

interface state {
	user: User
	stations: string[]
}

export default class Main extends React.Component<null, state> {
	constructor() {
		super(null)
		this.state = {
			user: userStore.getUser(),
			stations: null
		}
	}

	updateAccessToken() {
		this.setState({
			user: userStore.getUser()
		})
	}

	fetchNewStations() {
		fetch(`${config.apiURL}/station?index=0&count=5`, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error()
				}
				return res.json()
			})
			.then((json) => {
				this.setState({
					stations: json.stations
				})
			}).catch((e) => {
				console.log(e)
			})
	}

	componentWillMount() {
		userStore.on("change", this.updateAccessToken.bind(this))
		this.fetchNewStations()
	}
	
	render() {
		return(
			<main>
				{this.state.user ? <Feed user={this.state.user}/> : <Home/>}
			</main>
		)
	}
}
