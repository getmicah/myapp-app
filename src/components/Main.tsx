import * as React from "react"

import config from "../utils/config"
import { AuthJSON } from "../models/AuthModel"
import authStore from "../stores/AuthStore"
import * as authActions from "../actions/AuthActions"

import App from "./App"
import Login from "./Login"

interface props {}
interface state {
	authenticated: boolean
	loaded: boolean
	error: string
}

export default class Main extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			authenticated: authStore.getAuthentication(),
			loaded: false,
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
				this.setState({loaded: true})
				authActions.resolve()
			}).catch(() => {
				this.setState({loaded: true})
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
			<div>
				<main className={this.state.loaded ? null : "hidden"}>
					{this.state.authenticated ? <App /> : <Login />}
					{this.state.error ? <span className="error">this.state.error</span> : null}
				</main>
			</div>
		)
	}
}
