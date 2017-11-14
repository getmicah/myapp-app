import * as React from "react"

import { SpotifyItem} from "../models/SpotifyModel"

interface props {
	item: SpotifyItem
	selected: boolean
	onClick: any
}

const SpotifyListItem: React.StatelessComponent<props> = (props) => {
	return (
		<li className={props.selected ? "selected" : null} onClick={props.onClick}>
			{props.item.artist ? `${props.item.artist} - ` : null}{props.item.name}
		</li>
	)
}

export default SpotifyListItem