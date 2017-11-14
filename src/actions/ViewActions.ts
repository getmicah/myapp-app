import dispatcher from "../utils/dispatcher"

export function hideArtists() {
	dispatcher.dispatch({
		type: "HIDE_ARTISTS"
	})
}

export function showArtists() {
	dispatcher.dispatch({
		type: "SHOW_ARTISTS"
	})
}

export function hideTracks() {
	dispatcher.dispatch({
		type: "HIDE_TRACKS"
	})
}

export function showTracks() {
	dispatcher.dispatch({
		type: "SHOW_TRACKS"
	})
}