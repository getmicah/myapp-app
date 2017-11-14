import dispatcher from "../utils/dispatcher"

export function resolve() {
	dispatcher.dispatch({
		type: "RESOLVE"
	})
}

export function reject() {
	dispatcher.dispatch({
		type: "REJECT"
	})
}