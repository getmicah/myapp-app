import dispatcher from "../utils/dispatcher"

export function setAccessToken(value: string) {
	dispatcher.dispatch({
		type: "SET_ACCESS_TOKEN",
		payload: value
	})
}

export function removeAccessToken() {
	dispatcher.dispatch({
		type: "ClEAR_ACCESS_TOKEN",
		payload: null
	})
}