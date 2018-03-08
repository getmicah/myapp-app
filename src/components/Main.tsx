import * as React from "react"

import * as api from "../utils/api"
import { AuthJSON } from "../models/AuthModel"
import authStore from "../stores/AuthStore"
import * as authActions from "../actions/AuthActions"

import UserApp from "./UserApp"
import HomePage from "./HomePage"
import Footer from "./Footer"

interface props {}
interface state {
	authenticated: boolean
	loaded: boolean
}

export default class Main extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			authenticated: authStore.getAuthentication(),
			loaded: false
		}
	}

	updateAuth() {
		this.setState({authenticated: authStore.getAuthentication()})
	}

	componentWillMount() {
		authStore.on("change", this.updateAuth.bind(this))
		if (!this.state.authenticated) {
			api.getAuth().then(() => {
				this.setState({loaded: true})
				authActions.resolve()
			}).catch(() => {
				this.setState({loaded: true})
				authActions.reject()
			})
		}
	}
	
	render() {
		return (
			<div>
				<main className={this.state.loaded ? null : "hidden"}>
					{this.state.authenticated ? <UserApp /> : <HomePage />}
				</main>
				<Footer />
			</div>
		)
	}
}
