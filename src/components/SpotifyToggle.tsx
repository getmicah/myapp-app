import * as React from "react"

interface props {
	type: "artist" | "track"
	onChange: any
}

const SpotifyToggle: React.StatelessComponent<props> = (props) => {
	return (
		<div>
			<input
				type="radio"
				value="artist"
				name="type"
				checked={props.type === "artist"}
				onChange={props.onChange}
			/>
			<label htmlFor="artists" onClick={props.onChange}>Artists</label>
			<input
				type="radio"
				value="tracks"
				name="type"
				checked={props.type === "track"}
				onChange={props.onChange}
			/>
			<label htmlFor="tracks" onClick={props.onChange}>Tracks</label>
		</div>
	)
}

export default SpotifyToggle