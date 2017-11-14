import { EventEmitter } from "events"

import Action from "../actions/action"
import dispatcher from "../utils/dispatcher"

class AuthStore extends EventEmitter {
	authenticated: boolean

	constructor() {
		super()
		this.authenticated = false
	}

	getAuthentication(): boolean {
		return this.authenticated
	}

	setAuthentication(value: boolean): void {
		this.authenticated = value
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "RESOLVE":
				this.setAuthentication(true)
				break
			case "REJECT":
				this.setAuthentication(false)
				break
		}
	}
}

const authStore = new AuthStore
dispatcher.register(authStore.handleActions.bind(authStore))

export default authStore