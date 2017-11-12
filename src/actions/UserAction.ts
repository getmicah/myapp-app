import dispatcher from "../utils/dispatcher"
import { User } from "../models/UserModel"

export function set(user: User) {
	dispatcher.dispatch({
		type: "SET_USER",
		payload: user
	})
}

export function remove() {
	dispatcher.dispatch({
		type: "REMOVE_USER"
	})
}