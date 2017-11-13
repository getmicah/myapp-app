import * as React from "react"

import config from "../utils/config"
import { User } from "../models/UserModel"
import stationsStore from "../stores/StationsStore"
import * as stationsActions from "../actions/StationsActions"

interface props {
	user: User
}

interface state {
	stations: string[]
}

export default class Feed extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			stations: stationsStore.get()
		}
	}

	updateStations() {
		this.setState({
			stations: stationsStore.get()
		})
	}

	handleLoadStation() {
		fetch(`${config.apiURL}/station?id=getmicah`, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error();
				}
				return res.json()
			})
			.then((json) => {
				console.log(json)
			}).catch((e) => {
				console.log(e)
			})
	}
	
	handleStartStation() {
		fetch(`${config.apiURL}/station`, {
			method: "POST",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error();
				}
				return res.json()
			})
			.then((json) => {
				console.log(json)
			}).catch((e) => {
				console.log(e)
			})
	}
	
	handleStopStation() {
		fetch(`${config.apiURL}/station`, {
			method: "DELETE",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error();
				}
				return res.json()
			})
			.then((json) => {
				console.log(json)
			}).catch((e) => {
				console.log(e)
			})
	}

	fetchStations() {
		fetch(`${config.apiURL}/station?index=0&count=10`, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error();
				}
				return res.json()
			})
			.then((json) => {
				stationsActions.add(json.stations)
			}).catch((e) => {
				stationsActions.removeAll()
			})
	}

	componentWillMount() {
		stationsStore.on("change", this.updateStations.bind(this))
		this.fetchStations()
	}

	render() {
		return (
			<div>
				<h1>Feed</h1>
				<p>Hello, {this.props.user.id} ;)</p>
				<a href={`${config.apiURL}/auth/logout`}>Log out</a>
				<br/>
				<button onClick={this.handleLoadStation.bind(this)}>Load Station</button>
				<button onClick={this.handleStartStation.bind(this)}>Start Station</button>
				<button onClick={this.handleStopStation.bind(this)}>Stop Station</button>
			</div>
		)
	}
}