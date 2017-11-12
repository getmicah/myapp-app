import * as React from "react"

import Config from "../utils/config"

const Home: React.StatelessComponent<null> = () => {
	return(
		<div>
			<h1>Home</h1>
			<a href={Config.apiURL+"/auth/login"}>Log in with Spotify</a>
		</div>
	)
}

export default Home