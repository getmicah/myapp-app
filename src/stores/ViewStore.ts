import { EventEmitter } from "events"

import Action from "../actions/action"
import dispatcher from "../utils/dispatcher"

class ViewStore extends EventEmitter {
	artists: boolean

	constructor() {
		super()
		this.artists = true
	}

	showArtists(): boolean {
		return this.artists
	}

	setArtists(value: boolean): void {
		this.artists = value
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
		}
	}
}

const viewStore = new ViewStore
dispatcher.register(viewStore.handleActions.bind(viewStore))

export default viewStore