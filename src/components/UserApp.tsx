import * as React from "react"

import * as api from "../utils/api"
import { SpotifyItem } from "../models/SpotifyModel"
import artistStore from "../stores/ArtistStore"
import trackStore from "../stores/TrackStore"
import seedStore from "../stores/SeedStore"
import * as artistActions from "../actions/ArtistActions"
import * as trackActions from "../actions/TrackActions"

import SpotifySeeds from "./SpotifySeeds"
import TuningSeeds from "./TuningSeeds"
import Logout from "./Logout"

interface props {}
interface state {
	artists: SpotifyItem[]
	tracks: SpotifyItem[]
	danceability: number
	energy: number
	popularity: number
	valence: number
	searchType: "artist" | "track",
	playlistJSON: any
}

export default class UserApp extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			artists: artistStore.get(),
			tracks: trackStore.get(),
			danceability: seedStore.getDanceability(),
			energy: seedStore.getEnergy(),
			popularity: seedStore.getPopularity(),
			valence: seedStore.getValence(),
			searchType: "artist",
			playlistJSON: null
		}
	}

	updateArtists() {
		this.setState({artists: artistStore.get()})
	}

	updateTracks() {
		this.setState({tracks: trackStore.get()})
	}

	updateSeeds() {
		this.setState({
			danceability: seedStore.getDanceability(),
			energy: seedStore.getEnergy(),
			popularity: seedStore.getPopularity(),
			valence: seedStore.getValence()
		})
	}

	toggleSearchType() {
		this.setState({searchType: this.state.searchType === "artist" ? "track" : "artist"})
	}

	loadRecs() {
		api.getRec(this.state.artists, this.state.tracks, this.state.danceability, this.state.energy, this.state.popularity, this.state.valence)
			.then((json) => {
				console.log(json)
				this.setState({playlistJSON: json})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	createPlaylist() {
		api.postPlaylist(this.state.playlistJSON)
			.then((json) => {
				console.log(json)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	handleLoadSubmit() {
		if (this.state.artists.length > 0 || this.state.tracks.length > 0) {
			this.loadRecs()
		} else {
			alert("Please select at least one artist or track")
		}
	}

	handleCreateSubmit() {
		if (this.state.playlistJSON) {
			this.createPlaylist()
		}
	}

	componentWillMount() {
		artistStore.on("change", this.updateArtists.bind(this))
		trackStore.on("change", this.updateTracks.bind(this))
		seedStore.on("change", this.updateSeeds.bind(this))
	}

	render() {
		return (
			<div>
				<Logout />
				<div id="user-app">
					<SpotifySeeds
						type={this.state.searchType}
						max={3}
						store={this.state.searchType === "artist" ? artistStore : trackStore}
						actions={this.state.searchType === "artist" ? artistActions : trackActions}
						toggle={this.toggleSearchType.bind(this)}
						artists={this.state.artists}
						tracks={this.state.tracks}
					/>
					<TuningSeeds
						danceability={this.state.danceability}
						energy={this.state.energy}
						popularity={this.state.popularity}
						valence={this.state.valence}
					/>
					<button
						name="load"
						onClick={this.handleLoadSubmit.bind(this)}
					>Get Recomendations</button>
					<button
						name="create"
						onClick={this.handleCreateSubmit.bind(this)}
						disabled={!this.state.playlistJSON}
					>Create Playlist</button>
				</div>
			</div>
		)
	}
}