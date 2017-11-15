import * as React from "react"

import config from "../utils/config"
import { AvailableGenresJSON } from "../models/SeedModel"
import seedStore from "../stores/SeedStore"
import * as seedActions from "../actions/SeedActions"

import SeedSlider from "./SeedSlider"

interface props {
	className: string
	danceability: number
	energy: number
	popularity: number
	valence: number
	next: any
	back: any
}

const SelectSeeds: React.StatelessComponent<props> = (props) => {
	return (
		<section className={props.className}>
			<h2>Seeds</h2>
			<SeedSlider
				name="Danceability"
				descriptor={["Slow jam","Banger"]}
				value={props.danceability}
				max={1}
				min={0}
				step={0.1}
				onChange={seedActions.setDanceability}
			/>
			<SeedSlider
				name="Energy"
				descriptor={["Smooth","Heater"]}
				value={props.energy}
				max={1}
				min={0}
				step={0.1}
				onChange={seedActions.setEnergy}
			/>
			<SeedSlider
				name="Popularity"
				descriptor={["Deep cut","Billboard Top 40"]}
				value={props.popularity}
				max={100}
				min={0}
				step={10}
				onChange={seedActions.setPopularity}
			/>
			<SeedSlider
				name="Mood"
				descriptor={[":'(",":D"]}
				value={props.valence}
				max={1}
				min={0}
				step={0.1}
				onChange={seedActions.setValence}
			/>
			<button onClick={props.back}>Back</button>
			<button onClick={props.next}>Submit</button>
		</section>
	)
}

export default SelectSeeds