import dispatcher from "../utils/dispatcher"
import { SpotifyItem } from "../models/SpotifyModel"

export function add(artist: SpotifyItem) {
	dispatcher.dispatch({
		type: "ADD_ARTIST",
		payload: artist
	})
}

export function remove(artist: SpotifyItem) {
	dispatcher.dispatch({
		type: "REMOVE_ARTIST",
		payload: artist
	})
}

export function removeByIndex(i: number) {
	dispatcher.dispatch({
		type: "REMOVE_ARTIST_INDEX",
		payload: i
	})
}

export function clear() {
	dispatcher.dispatch({
		type: "CLEAR_ARTISTS"
	})
}