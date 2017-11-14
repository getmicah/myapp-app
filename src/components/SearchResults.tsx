import * as React from "react"

import { SpotifyItem } from "../models/SpotifyModel"

interface props {
	selected: number
	items: SpotifyItem[]
	add: any
}

const SearchResults: React.StatelessComponent<props> = (props) => {
	return (
		<ul>
			{props.items.map((item, i) => {
				return (
					<li 
						key={i}
						onClick={() => props.add(i)}
						className={props.selected == i ? "selected" : null}
					>{item.name}</li>
				)
			})}
		</ul>
	)
}

export default SearchResults