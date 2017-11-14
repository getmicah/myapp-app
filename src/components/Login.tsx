import * as React from "react"

import config from "../utils/config"
import * as authActions from "../actions/AuthActions"

function fetchLogin() {
	fetch(`${config.apiURL}/auth/login`, {
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
		}).catch((e) => {
			console.log(e)
			authActions.reject()
		})
}

const Login: React.StatelessComponent<null> = () => {
	return (
		<button onClick={fetchLogin}>Login with Spotify</button>
	)
}

export default Login