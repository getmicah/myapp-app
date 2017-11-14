import * as React from "react"

import config from "../utils/config"
import * as authActions from "../actions/AuthActions"

function fetchLogout() {
	fetch(`${config.apiURL}/auth/logout`, {
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
			authActions.reject()
		}).catch((e) => {
			console.log(e)
		})
}

const Logout: React.StatelessComponent<null> = () => {
	return (
		<button onClick={fetchLogout}>Logout</button>
	)
}

export default Logout