import * as React from "react"

import config from "../utils/config"
import { AuthJSON } from "../models/AuthModel"
import authStore from "../stores/AuthStore"
import * as authActions from "../actions/AuthActions"

import Header from "./Header"
import UserView from "./UserView"
import Login from "./Login"

interface state {
	authenticated: boolean
	error: string
}

export default class Main extends React.Component<null, state> {
	constructor() {
		super(null)
		this.state = {
			authenticated: authStore.getAuthentication(),
			error: null
		}
	}

	updateAuth() {
		this.setState({authenticated: authStore.getAuthentication()})
	}

	fetchAuth() {
		fetch(`${config.apiURL}/auth`, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error()
				}
				return res.json()
			})
			.then(() => {
				authActions.resolve()
			}).catch(() => {
				authActions.reject()
			})
	}

	componentWillMount() {
		authStore.on("change", this.updateAuth.bind(this))
		if (!this.state.authenticated) {
			this.fetchAuth()
		}
	}
	
	render() {
		return (
			<main>
				<Header authenticated={this.state.authenticated}/>
				{this.state.error ? this.state.error : null}
				{this.state.authenticated ? <UserView /> : <Login />}
			</main>
		)
	}
}
