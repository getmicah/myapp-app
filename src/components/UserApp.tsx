import * as React from "react"

import * as api from "../utils/api"
import { SpotifyItem } from "../models/SpotifyModel"
import artistStore from "../stores/ArtistStore"
import trackStore from "../stores/TrackStore"
import seedStore from "../stores/SeedStore"
import * as artistActions from "../actions/ArtistActions"
import * as trackActions from "../actions/TrackActions"
import * as seedActions from "../actions/SeedActions"

import Logout from "./Logout"
import SpotifySeeds from "./SpotifySeeds"
import TuningSeeds from "./TuningSeeds"
import MainButton from "./MainButton"
import ResetButton from "./ResetButton"

interface props {}
interface state {
	artists: SpotifyItem[]
	tracks: SpotifyItem[]
	danceability: number
	energy: number
	popularity: number
	valence: number
	searchType: "artist" | "track",
	playlistID: string,
	playlistUsername: string,
	playlistJSON: any,
	buttonClass: string,
	buttonDisabled: boolean,
	buttonHandler: any,
	buttonText: string,
	resetHandler: any
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
			playlistID: null,
			playlistUsername: null,
			playlistJSON: null,
			buttonClass: null,
			buttonDisabled: false,
			buttonHandler: this.handleLoadClick.bind(this),
			buttonText: "Create Playlist",
			resetHandler: this.handleReset.bind(this)
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

	handleLoadClick() {
		if (this.state.artists.length > 0 || this.state.tracks.length > 0) {
			this.setState({
				buttonText: "Loading...",
				buttonHandler: null,
				buttonDisabled: true
			})
			this.loadRecs()
		} else {
			alert("Please select at least one artist or track")
		}
	}

	loadRecs() {
		api.getRec(this.state.artists, this.state.tracks, this.state.danceability, this.state.energy, this.state.popularity, this.state.valence)
			.then((json) => {
				this.setState({playlistJSON: json}, this.addPlaylist.bind(this))
			})
			.catch((err) => {
				alert("Oops. You're selections were to diverse for Spotify, try using more similair artists.")
				this.setState({
					buttonText: "Get Recomendations",
					buttonDisabled: false
				})
			})
	}

	addPlaylist() {
		api.postPlaylist(this.state.playlistJSON)
			.then((json) => {
				this.setState({
					playlistID: json["id"],
					playlistUsername: json["username"],
					buttonClass: "tada", // animate.css
					buttonText: "Open playlist",
					buttonHandler: this.openPlaylist.bind(this),
					buttonDisabled: false
				})
			})
			.catch((err) => {
				console.log(err)
				alert("Something went wrong... Open the console to find out more")
				this.setState({
					buttonText: "Get Recomendations",
					buttonHandler: this.handleLoadClick.bind(this),
					buttonDisabled: false
				})
			})
	}

	openPlaylist() {
		const playlistURL = `https://open.spotify.com/user/${this.state.playlistUsername}/playlist/${this.state.playlistID}`
		window.open(playlistURL, '_blank');
	}

	handleReset() {
		this.setState({
			playlistID: null,
			playlistUsername: null,
			playlistJSON: null,
			buttonClass: null,
			buttonHandler: this.handleLoadClick.bind(this),
			buttonText: "Create Playlist"
		})
		artistActions.clear()
		trackActions.clear()
		seedActions.clear()
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
					<MainButton
						class={this.state.buttonClass}
						disabled={this.state.buttonDisabled}
						handler={this.state.buttonHandler}
						text={this.state.buttonText}
					/>
					<ResetButton
						handler={this.state.resetHandler}
						show={
							this.state.artists.length > 0 ||
							this.state.tracks.length > 0 ||
							this.state.danceability > 0 ||
							this.state.energy > 0 ||
							this.state.popularity > 0 ||
							this.state.valence > 0
						}
					/>
				</div>
			</div>
		)
	}
}