import * as React from "react"

import config from "../utils/config"

interface props {}
interface state {
	buttonText: string
}

export default class HomePage extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			buttonText: "Login with Spotify"
		}
	}
	onClick () {
		this.setState({buttonText: "Logging in..."})
		location.href = `${config.apiURL}/auth/login`
	}
	
	render() {
		return (
			<div id="landing-page-container">
				<div id="landing-page">
					<span id="landing-page-text">Spotify Weekly<br/>any day of the week</span>
					<div id="landing-page-login-container">
						<button
							id="landing-page-login"
							onClick={this.onClick.bind(this)}
						>{this.state.buttonText}</button>
					</div>
				</div>
			</div>
		)
	}
}