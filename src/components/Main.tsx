import * as React from "react"

import Home from "./Home"
import User from "./User"

interface Props {
	accessToken: string
}

const Main: React.SFC<Props> = (props) => {
	return(
		<main>
			{props.accessToken ? <User/> : <Home/>}
		</main>
	)
}

export default Main
