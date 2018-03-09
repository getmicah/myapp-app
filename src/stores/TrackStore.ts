import { EventEmitter } from "events"

import Action from "../actions/action"
import dispatcher from "../utils/dispatcher"
import { SpotifyItem, SpotifyItemJSON } from "../models/SpotifyModel"

class TrackStore extends EventEmitter {
	tracks: SpotifyItem[]

	constructor() {
		super()
		this.tracks = []
	}

	get(): SpotifyItem[] {
		return this.tracks
	}

	addTrack(track: SpotifyItem): void {
		if (this.tracks.indexOf(track) == -1) {
			this.tracks.push(track)
			this.emit("change")
		}
	}

	removeTrack(track: SpotifyItem): void {
		for (let i = 0; i < this.tracks.length; i++) {
			if (this.tracks[i].id === track.id) {
				this.tracks = this.tracks.splice(i, 1)
				this.emit("change")
				return
			}
		}
	}

	removeTrackByIndex(i: number): void {
		if (this.tracks.length > i) {
			this.tracks.splice(i, 1);
			this.emit("change")
		}
	}

	clear(): void {
		this.tracks = []
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "ADD_TRACK":
				this.addTrack(action.payload)
				break
			case "REMOVE_TRACK":
				this.removeTrack(action.payload)
				break
			case "REMOVE_TRACK_INDEX":
				this.removeTrackByIndex(action.payload)
				break
			case "CLEAR_TRACKS":
				this.clear()
				break
		}
	}
}

const trackStore = new TrackStore
dispatcher.register(trackStore.handleActions.bind(trackStore))

export default trackStore