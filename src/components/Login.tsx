import * as React from "react"

import config from "../utils/config"

const Login: React.StatelessComponent<null> = () => {
	return (
		<a href={`${config.apiURL}/auth/login`}>Login with Spotify</a>
	)
}

export default Login