import { EventEmitter } from "events"

import Action from "../actions/action"
import dispatcher from "../utils/dispatcher"
import { SpotifyItem, SpotifyItemJSON } from "../models/SpotifyModel"

class SpotifyStore extends EventEmitter {
	artists: SpotifyItem[]

	constructor() {
		super()
		this.artists = []
	}

	get(): SpotifyItem[] {
		return this.artists
	}

	addArtist(artist: SpotifyItem): void {
		if (this.artists.indexOf(artist) == -1) {
			this.artists.push(artist)
			this.emit("change")
		}
	}

	removeArtist(artist: SpotifyItem): void {
		for (let i = 0; i < this.artists.length; i++) {
			if (this.artists[i].id === artist.id) {
				this.artists = this.artists.splice(i, 1)
				this.emit("change")
				return
			}
		}
	}

	removeArtistByIndex(i: number): void {
		if (this.artists.length > i) {
			this.artists.splice(i, 1);
			this.emit("change")
		}
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "ADD_ARTIST":
				this.addArtist(action.payload)
				break
			case "REMOVE_ARTIST":
				this.removeArtist(action.payload)
				break
			case "REMOVE_ARTIST_INDEX":
				this.removeArtistByIndex(action.payload)
				break
		}
	}
}

const spotifyStore = new SpotifyStore
dispatcher.register(spotifyStore.handleActions.bind(spotifyStore))

export default spotifyStore