import * as React from "react"

import viewStore from "../stores/ViewStore"
import * as viewActions from "../actions/ViewActions"
import { SpotifyItem } from "../models/SpotifyModel"
import spotifyStore from "../stores/SpotifyStore"

import AddArtists from "./AddArtists"

interface state {
	selectedArtists: SpotifyItem[]
	showArtists: boolean
}

export default class UserView extends React.Component<null, state> {
	constructor() {
		super(null)
		this.state = {
			selectedArtists: spotifyStore.getArtists(),
			showArtists: viewStore.showArtists()
		}
	}

	updateSelectedArtists() {
		this.setState({selectedArtists: spotifyStore.getArtists()})
	}

	componentWillMount() {
		spotifyStore.on("change", this.updateSelectedArtists.bind(this))
	}

	handleArtistsNext() {
		viewActions.hideArtists()
	}

	render() {
		return (
			<div>
				{this.state.showArtists ? 
					<AddArtists next={this.handleArtistsNext.bind(this)} /> 
				: null}
			</div>
		)
	}
}