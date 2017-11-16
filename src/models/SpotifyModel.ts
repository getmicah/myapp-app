interface ArtistJSON {
	"name": string
}

class Artist {
	name: string

	constructor(json: ArtistJSON) {
		this.name = json["name"]
	}
} 

export interface SpotifyItemJSON {
	"id": string
	"name": string
	"artists"?: ArtistJSON[]
}

export class SpotifyItem {
	id: string
	name: string
	artist: string

	constructor(json: SpotifyItemJSON) {
		this.id = json["id"]
		this.name = json["name"]
		this.artist;
		if (json["artists"]) {
			this.artist = new Artist(json["artists"][0]).name
		}
	}
}