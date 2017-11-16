import * as React from "react"

import config from "../utils/config"
import { AvailableGenresJSON } from "../models/SeedModel"
import seedStore from "../stores/SeedStore"
import * as seedActions from "../actions/SeedActions"

import TuningSlider from "./TuningSlider"

interface props {
	danceability: number
	energy: number
	popularity: number
	valence: number
}

const TuningSeeds: React.StatelessComponent<props> = (props) => {
	return (
		<section id="tuning-seeds" className="wrapper">
			<div>
				<TuningSlider
					name="Danceability"
					descriptors={["Classical","Club"]}
					value={props.danceability}
					max={1}
					min={0}
					step={0.1}
					onChange={seedActions.setDanceability}
				/>
				<TuningSlider
					name="Energy"
					descriptors={["Smooth","Banger"]}
					value={props.energy}
					max={1}
					min={0}
					step={0.1}
					onChange={seedActions.setEnergy}
				/>
			</div>
			<div>
				<TuningSlider
					name="Popularity"
					descriptors={["Deep cut","Hot 100"]}
					value={props.popularity}
					max={100}
					min={0}
					step={10}
					onChange={seedActions.setPopularity}
				/>
				<TuningSlider
					name="Mood"
					descriptors={["Sad","Happy"]}
					value={props.valence}
					max={1}
					min={0}
					step={0.1}
					onChange={seedActions.setValence}
				/>
			</div>
		</section>
	)
}

export default TuningSeeds