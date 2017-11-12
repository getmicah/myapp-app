import { EventEmitter } from "events"

import Action from "./action"
import dispatcher from "../utils/dispatcher"
import { User } from "../models/UserModel"

class UserStore extends EventEmitter {
	user: User

	constructor() {
		super()
		this.user = null
	}

	getUser(): User {
		return this.user
	}

	setUser(user: User): void {
		this.user = user
		this.emit("change")
	}

	removeUser(): void {
		this.user = null
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "SET_USER":
				this.setUser(action.payload)
				break
			case "REMOVE_USER":
				this.removeUser()
				break
		}
	}
}

const userStore = new UserStore
dispatcher.register(userStore.handleActions.bind(userStore))

export default userStore