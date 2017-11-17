import * as React from "react"

import { SpotifyItem } from "../models/SpotifyModel"

import SpotifyListItem from "./SpotifyListItem"

interface props {
	className: string
	items: SpotifyItem[]
	index: number
	onItemClick: any
}

const SpotifyIndexList: React.StatelessComponent<props> = (props) => {
	return (
		<ul className={props.className}>
			{props.items.map((item, i) => {
				return (
					<SpotifyListItem 
						key={i}
						item={item}
						selected={i == props.index}
						onClick={() => props.onItemClick(i)}
					/>
				)
			})}
		</ul>
	)
}

export default SpotifyIndexList