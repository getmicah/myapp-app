import * as React from "react"

import debounce from "../utils/debounce"
import * as api from "../utils/api"

interface props {
	value: string
	type: "artist" | "track"
	delay: number
	results: any
	onChange: any
	onKeydown: any
	clearResults: any
}

export default class SpotifySearch extends React.Component<props, null> {
	constructor(props: props) {
		super(props)
		this.handleNewQuery = debounce(this.handleNewQuery.bind(this), this.props.delay, null)
	}

	handleNewQuery() {
		const uriPrefix = `spotify:${this.props.type}:`
		const query = this.props.value
		if (query.substring(0,uriPrefix.length) == uriPrefix) {
			const id = query.substring(uriPrefix.length, query.length)
			api.getId(id, this.props.type)
				.then((json) => {
					this.props.results([json])
				})
				.catch((e) => console.log(e))
			return
		} else if (query.length > 1) {
			api.getSearch(query, this.props.type)
				.then((json) => {
					this.props.results(json[`${this.props.type}s`].items)
				})
				.catch((e) => console.log(e))
		} else {
			this.props.clearResults()
		}
	}

	render() {
		return (
			<div>
				<input
					type="text"
					onChange={(e) => {this.props.onChange(e, this.handleNewQuery.bind(this))}}
					onKeyDown={this.props.onKeydown}
					placeholder={`...or insert "spotify:${this.props.type}:uri"`}
					value={this.props.value}
				/>
			</div>
		)
	}
}