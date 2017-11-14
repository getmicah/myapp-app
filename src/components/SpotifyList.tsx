import * as React from "react"

import { SpotifyItem } from "../models/SpotifyModel"

import SpotifyListItem from "./SpotifyListItem"

interface props {
	selected: number
	items: SpotifyItem[]
	onItemClick: any
}

const SearchResults: React.StatelessComponent<props> = (props) => {
	return (
		<ul>
			{props.items.map((item, i) => {
				return (
					<SpotifyListItem 
						key={i}
						item={item}
						selected={i == props.selected}
						onClick={() => props.onItemClick(i)}
					/>
				)
			})}
		</ul>
	)
}

export default SearchResults