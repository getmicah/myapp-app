import dispatcher from "../utils/dispatcher"

export function show() {
	dispatcher.dispatch({
		type: "SHOW"
	})
}

export function hide() {
	dispatcher.dispatch({
		type: "HIDE"
	})
}