import * as React from "react"

import Config from "../utils/config"

export default class Home extends React.Component {
	render() {
		return(
			<div>
				<h3>Home page</h3>
				<a href={Config.apiURL+"/login"}>Log in with Spotify</a>
			</div>
		)
	}
}