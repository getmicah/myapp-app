import dispatcher from "../utils/dispatcher"
import { SpotifyItem } from "../models/SpotifyModel"

export function add(track: SpotifyItem) {
	dispatcher.dispatch({
		type: "ADD_TRACK",
		payload: track
	})
}

export function remove(track: SpotifyItem) {
	dispatcher.dispatch({
		type: "REMOVE_TRACK",
		payload: track
	})
}

export function removeByIndex(i: number) {
	dispatcher.dispatch({
		type: "REMOVE_TRACK_INDEX",
		payload: i
	})
}