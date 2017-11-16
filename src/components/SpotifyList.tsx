import * as React from "react"

import { SpotifyItem } from "../models/SpotifyModel"

import SpotifyListItem from "./SpotifyListItem"

interface props {
	className: string
	index: number
	items: SpotifyItem[]
	onItemClick: any
}

const SearchResults: React.StatelessComponent<props> = (props) => {
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

export default SearchResults