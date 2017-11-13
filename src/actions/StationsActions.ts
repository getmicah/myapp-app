import dispatcher from "../utils/dispatcher"

export function add(stations: any) {
	dispatcher.dispatch({
		type: "ADD",
		payload: stations
	})
}

export function removeAll() {
	dispatcher.dispatch({
		type: "REMOVE"
	})
}