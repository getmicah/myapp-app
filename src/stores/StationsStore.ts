import { EventEmitter } from "events"

import Action from "./action"
import dispatcher from "../utils/dispatcher"

class StationsStore extends EventEmitter {
	stations: string[]

	constructor() {
		super()
		this.stations = []
	}

	get(): string[] {
		return this.stations
	}

	show(): boolean {
		return this.stations.length > 0 ? true : false
	}

	add(newStations: string[]): void {
		this.stations = this.stations.concat(newStations)
		this.emit("change")
	}
	
	removeAll(): void {
		this.stations = []
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "ADD":
				this.add(action.payload)
				break
			case "REMOVE":
				this.removeAll()
				break
		}
	}
}

const stationsStore = new StationsStore
dispatcher.register(stationsStore.handleActions.bind(stationsStore))

export default stationsStore