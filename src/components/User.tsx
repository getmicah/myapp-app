import * as React from "react"

import Config from "../config"
import * as storage from "../utils/storage"

export default class User extends React.Component {
	onLogoutClick(): void {
		storage.clearLocalStorage()
	}

	render() {
		return (
			<div>
				<h3>User page</h3>
				<a href="/" onClick={this.onLogoutClick.bind(this)}>Log out</a>
			</div>
		)
	}
}