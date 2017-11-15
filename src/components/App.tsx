import * as React from "react"

import config from "../utils/config"
import viewStore from "../stores/ViewStore"
import * as viewActions from "../actions/ViewActions"
import { SpotifyItem } from "../models/SpotifyModel"
import artistStore from "../stores/ArtistStore"
import * as artistActions from "../actions/ArtistActions"
import trackStore from "../stores/TrackStore"
import * as trackActions from "../actions/TrackActions"
import seedStore from "../stores/SeedStore"

import SpotifySection from "./SpotifySection"
import SelectSeeds from "./SelectSeeds"
import Logout from "./Logout"

interface props {}
interface state {
	artists: SpotifyItem[]
	tracks: SpotifyItem[]
	danceability: number
	energy: number
	popularity: number
	valence: number
	showArtists: boolean
	showTracks: boolean
	showSeeds: boolean
}

export default class App extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			artists: artistStore.get(),
			tracks: trackStore.get(),
			danceability: seedStore.getDanceability(),
			energy: seedStore.getEnergy(),
			popularity: seedStore.getPopularity(),
			valence: seedStore.getValence(),
			showArtists: viewStore.getArtists(),
			showTracks: viewStore.getTracks(),
			showSeeds: viewStore.getSeeds()
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

	updateView() {
		this.setState({
			showArtists: viewStore.getArtists(),
			showTracks: viewStore.getTracks(),
			showSeeds: viewStore.getSeeds()
		})
	}

	artistsNext() {
		if (this.state.artists.length > 0) {
			viewActions.hideArtists()
			setTimeout(viewActions.showTracks, 500);
		} else {
			alert("Add a least one artist")
		}
	}

	tracksBack() {
		viewActions.hideTracks()
		setTimeout(viewActions.showArtists, 500);
	}

	tracksNext() {
		if (this.state.tracks.length > 0) {
			viewActions.hideTracks()
			setTimeout(viewActions.showSeeds, 500);
		} else {
			alert("Add a least one track")
		}
	}

	seedsBack() {
		viewActions.hideSeeds()
		setTimeout(viewActions.showTracks, 500);
	}

	componentWillMount() {
		artistStore.on("change", this.updateArtists.bind(this))
		trackStore.on("change", this.updateTracks.bind(this))
		seedStore.on("change", this.updateSeeds.bind(this))
		viewStore.on("change", this.updateView.bind(this))
	}

	fetchPlaylist(json) {
		const body = {uris: []}
		for (let i = 0; i < json.tracks.length; i++) {
			body.uris.push(json.tracks[i].uri)
		}
		console.log(body)
		fetch(`${config.apiURL}/playlist`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(body),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.then((res) => {
				if (!res.ok) {
					throw Error()
				}
				return res.json()
			})
			.then((json) => {
				console.log(json)
			}).catch((e) => {
				console.log(e)
			})
	}

	fetchRecomendations() {
		const a = this.state.artists.map((item) => {
			return item.id;
		}).join(",");
		const t = this.state.tracks.map((item) => {
			return item.id;
		}).join(",");
		let url = `${config.apiURL}/rec?seed_artists=${a}&seed_tracks=${t}`
		if (this.state.danceability != null) {
			url += `&target_danceability=${this.state.danceability}`
		}
		if (this.state.energy != null) {
			url += `&target_energy=${this.state.energy}`
		}
		if (this.state.popularity != null) {
			url += `&target_popularity=${this.state.popularity}`
		}
		if (this.state.valence != null) {
			url += `&target_valence=${this.state.valence}`
		}
		console.log(url)
		fetch(url, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error()
				}
				return res.json()
			})
			.then(this.fetchPlaylist.bind(this))
			.catch((e) => {
				console.log(e)
			})
	}

	render() {
		return (
			<div>
				<Logout />
				<SpotifySection
					className={this.state.showArtists ? null : "hidden"}
					type="artist"
					max={3}
					store={artistStore}
					actions={artistActions}
					next={this.artistsNext.bind(this)}
					back={null}
				/>
				<SpotifySection
					className={this.state.showTracks ? null : "hidden"}
					type="track"
					max={3}
					store={trackStore}
					actions={trackActions}
					next={this.tracksNext.bind(this)}
					back={this.tracksBack.bind(this)}
				/>
				<SelectSeeds
					className={this.state.showSeeds ? null : "hidden"}
					danceability={this.state.danceability}
					energy={this.state.energy}
					popularity={this.state.popularity}
					valence={this.state.valence}
					next={this.fetchRecomendations.bind(this)}
					back={this.seedsBack.bind(this)}
				/>
			</div>
		)
	}
}