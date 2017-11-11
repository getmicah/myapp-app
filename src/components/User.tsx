import * as React from "react"

import Config from "../utils/config"
import * as storage from "../utils/storage"
import * as tokenActions from "../actions/TokenActions"

export default class User extends React.Component {
	onLogoutClick(): void {
		storage.clearLocalStorage(() => {
			tokenActions.removeAccessToken()
		})
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