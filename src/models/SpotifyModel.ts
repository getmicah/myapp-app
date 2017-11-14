export interface SpotifyItemJSON {
	"id": string
	"name": string
}

export class SpotifyItem {
	id: string
	name: string

	constructor(json: SpotifyItemJSON) {
		this.id = json["id"]
		this.name = json["name"]
	}
}