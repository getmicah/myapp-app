import * as React from "react"

import config from "../utils/config"

const Logout: React.StatelessComponent<null> = () => {
	return (
		<a className="logout" href={`${config.apiURL}/auth/logout`}>Logout</a>
	)
}

export default Logout