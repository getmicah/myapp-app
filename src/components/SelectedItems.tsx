import * as React from "react"

import { SpotifyItem } from "../models/SpotifyModel"

interface props {
	items: SpotifyItem[]
	remove: any
}

const SelectedItems: React.StatelessComponent<props> = (props) => {
	return (
		<ul>
			{props.items.map((item, i) => {
				return <li key={i} onClick={() => props.remove(i)}>{item.name}</li>
			})}
		</ul>
	)
}

export default SelectedItems