import dispatcher from "../utils/dispatcher"
import { SpotifyItem } from "../models/SpotifyModel"

export function setDanceability(value: number) {
	dispatcher.dispatch({
		type: "SET_DANCEABILITY",
		payload: value
	})
}

export function setEnergy(value: number) {
	dispatcher.dispatch({
		type: "SET_ENERGY",
		payload: value
	})
}

export function setPopularity(value: number) {
	dispatcher.dispatch({
		type: "SET_POPULARITY",
		payload: value
	})
}

export function setValence(value: number) {
	dispatcher.dispatch({
		type: "SET_VALENCE",
		payload: value
	})
}