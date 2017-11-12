import { EventEmitter } from "events"

import Action from "./action"
import dispatcher from "../utils/dispatcher"

class ViewStore extends EventEmitter {
	view: boolean

	constructor() {
		super()
		this.view = false
	}

	get(): boolean {
		return this.view
	}

	set(value: boolean): void {
		this.view = value
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "SHOW":
				this.set(true)
				break
			case "HIDE":
				this.set(false)
				break
		}
	}
}

const viewStore = new ViewStore
dispatcher.register(viewStore.handleActions.bind(viewStore))

export default viewStore