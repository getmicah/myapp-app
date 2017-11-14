import * as React from "react"

import viewStore from "../stores/ViewStore"
import * as viewActions from "../actions/ViewActions"
import { SpotifyItem } from "../models/SpotifyModel"
import artistStore from "../stores/ArtistStore"
import * as artistActions from "../actions/ArtistActions"
import trackStore from "../stores/trackStore"
import * as trackActions from "../actions/TrackActions"

import Section from "./Section"
import Logout from "./Logout"

interface props {}
interface state {
	artists: SpotifyItem[]
	tracks: SpotifyItem[]
	showArtists: boolean
	showTracks: boolean
}

export default class App extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			artists: artistStore.get(),
			tracks: trackStore.get(),
			showArtists: viewStore.getArtists(),
			showTracks: viewStore.getTracks()
		}
	}

	updateArtists() {
		this.setState({
			artists: artistStore.get()
		})
	}

	updateTracks() {
		this.setState({
			tracks: trackStore.get()
		})
	}

	updateView() {
		this.setState({showArtists: viewStore.getArtists()})
		this.setState({showTracks: viewStore.getTracks()})
	}

	handleArtistsNext() {
		if (this.state.artists.length > 0) {
			viewActions.hideArtists()
			setTimeout(viewActions.showTracks, 500);
		} else {
			alert("Add a least one artist")
		}
	}

	handleTracksNext() {
		if (this.state.tracks.length > 0) {
			viewActions.hideTracks()
		} else {
			alert("Add a least one track")
		}
	}

	handleTracksBack() {
		viewActions.hideTracks()
		setTimeout(viewActions.showTracks, 500);
	}

	componentWillMount() {
		artistStore.on("change", this.updateArtists.bind(this))
		viewStore.on("change", this.updateView.bind(this))
	}

	render() {
		return (
			<div>
				<Logout />
				<Section
					className={this.state.showArtists ? null : "hidden"}
					type="artist"
					store={artistStore}
					actions={artistActions}
					next={this.handleArtistsNext.bind(this)}
					back={null}
				/>
				<Section
					className={this.state.showTracks ? null : "hidden"}
					type="track"
					store={trackStore}
					actions={trackActions}
					next={this.handleTracksNext.bind(this)}
					back={this.handleTracksBack.bind(this)}
				/>
			</div>
		)
	}
}