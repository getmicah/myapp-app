import * as React from "react"

import Config from "../utils/config"
import { User } from "../models/UserModel"

interface props {
	user: User
}

const Feed: React.StatelessComponent<props> = (props) => {
	return (
		<div>
			<h1>Feed</h1>
			<p>Hello, {props.user.id} ;)</p>
			<a href={`${Config.apiURL}/auth/logout`}>Log out</a>
		</div>
	)
}

export default Feed