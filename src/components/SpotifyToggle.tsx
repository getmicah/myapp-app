import * as React from "react"

interface props {
	type: "artist" | "track"
	onChange: any
}

const onChange = (e: React.FormEvent<HTMLInputElement>, props: props) => {
	if (e.currentTarget.value !== props.type) {
		props.onChange()
	}
}

const onClick = (e: React.FormEvent<HTMLLabelElement>, props: props) => {
	if (e.currentTarget.htmlFor !== props.type) {
		props.onChange()
	}
}

const SpotifyToggle: React.StatelessComponent<props> = (props) => {
	return (
		<div>
			<input
				type="radio"
				value="artist"
				name="type"
				checked={props.type === "artist"}
				onChange={(e) => onChange(e, props)}
			/>
			<label htmlFor="artist" onClick={(e) => onClick(e, props)}>Artists</label>
			<input
				type="radio"
				value="tracks"
				name="type"
				checked={props.type === "track"}
				onChange={(e) => onChange(e, props)}
			/>
			<label htmlFor="track" onClick={(e) => onClick(e, props)}>Tracks</label>
		</div>
	)
}

export default SpotifyToggle