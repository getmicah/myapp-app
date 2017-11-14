import dispatcher from "../utils/dispatcher"
import { SpotifyItem } from "../models/SpotifyModel"

export function addArtist(artist: SpotifyItem) {
	dispatcher.dispatch({
		type: "ADD_ARTIST",
		payload: artist
	})
}

export function removeArtist(artist: SpotifyItem) {
	dispatcher.dispatch({
		type: "REMOVE_ARTIST",
		payload: artist
	})
}

export function removeArtistByIndex(i: number) {
	dispatcher.dispatch({
		type: "REMOVE_ARTIST_INDEX",
		payload: i
	})
}