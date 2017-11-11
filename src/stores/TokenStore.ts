import { EventEmitter } from "events"

import dispatcher from "../utils/dispatcher"

interface Action {
	type: string
	payload: any
}

class TokenStore extends EventEmitter {
	accessToken: string

	constructor() {
		super()
		this.accessToken = null
	}

	getAccessToken(): string {
		return this.accessToken
	}

	setAccessToken(value: string): void {
		this.accessToken = value
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "SET_ACCESS_TOKEN":
				this.setAccessToken(action.payload)
				break
			case "REMOVE_ACCESS_TOKEN":
				this.setAccessToken(null)
				break
		}
	}
}

const tokenStore = new TokenStore
dispatcher.register(tokenStore.handleActions.bind(tokenStore))

export default tokenStore