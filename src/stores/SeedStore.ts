import { EventEmitter } from "events"

import Action from "../actions/action"
import dispatcher from "../utils/dispatcher"

class SeedStore extends EventEmitter {
	danceability: number
	energy: number
	popularity: number
	valence: number

	constructor() {
		super()
		this.danceability = null
		this.energy = null
		this.popularity = null
		this.valence = null
	}

	getDanceability(): number {
		return this.danceability
	}
	
	setDanceability(value: number): void {
		this.danceability = value
		this.emit("change")
	}

	getEnergy(): number {
		return this.energy
	}
	
	setEnergy(value: number): void {
		this.energy = value
		this.emit("change")
	}

	getPopularity(): number {
		return this.popularity
	}
	
	setPopularity(value: number): void {
		this.popularity = value
		this.emit("change")
	}

	getValence(): number {
		return this.valence
	}
	
	setValence(value: number): void {
		this.valence = value
		this.emit("change")
	}

	clear(): void {
		this.danceability = null
		this.energy = null
		this.popularity = null
		this.valence = null
		this.emit("change")
	}

	handleActions(action: Action) {
		switch(action.type) {
			case "SET_DANCEABILITY":
				this.setDanceability(action.payload)
				break
			case "SET_ENERGY":
				this.setEnergy(action.payload)
				break
			case "SET_POPULARITY":
				this.setPopularity(action.payload)
				break
			case "SET_VALENCE":
				this.setValence(action.payload)
				break
			case "CLEAR_SEEDS":
				this.clear()
				break
		}
	}
}

const seedStore = new SeedStore
dispatcher.register(seedStore.handleActions.bind(seedStore))

export default seedStore