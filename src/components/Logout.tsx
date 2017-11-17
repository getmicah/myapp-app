import * as React from "react"

import config from "../utils/config"

const Logout: React.StatelessComponent<null> = () => {
	return (
		<div className="auth-link-container">
			<a className="auth-link" href={`${config.apiURL}/auth/logout`}>Logout</a>
		</div>
	)
}

export default Logout