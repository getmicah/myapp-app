import * as React from "react"

import Logout from "./Logout"

interface props {
	authenticated: boolean
}

const Header: React.StatelessComponent<props> = (props) => {
	return (
		<header>
			<h1>myapp</h1>
			{props.authenticated ? <Logout /> : null}
		</header>
	)
}

export default Header