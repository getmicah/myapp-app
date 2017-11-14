import { EventEmitter } from "events"

import Action from "../actions/action"
import dispatcher from "../utils/dispatcher"

class ViewStore extends EventEmitter {
	artists: boolean
	tracks: boolean

	constructor() {
		super()
		this.artists = true
		this.tracks = false
	}

	getArtists(): boolean {
		return this.artists
	}

	getTracks(): boolean {
		return this.tracks
	}

	setArtists(value: boolean): void {
		this.artists = value
		this.emit("change")
	}

	setTracks(value: boolean): void {
		this.tracks = value
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "HIDE_ARTISTS":
				this.setArtists(false)
				break
			case "SHOW_ARTISTS":
				this.setArtists(true)
				break
			case "HIDE_TRACKS":
				this.setTracks(false)
				break
			case "SHOW_TRACKS":
				this.setTracks(true)
				break
		}
	}
}

const viewStore = new ViewStore
dispatcher.register(viewStore.handleActions.bind(viewStore))

export default viewStore