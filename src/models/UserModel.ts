export interface UserJSON {
	"display_name": string
	"external_urls": {
		"spotify": string
	}
	"followers": {
		"href": string
		"total": number
	}
	"href": string
	"id": string
	"images": string[]
	"type": string
	"uri": string
}

export class User {
	displayName: string
	spotifyUrl: string
	followers: number
	href: string
	id: string
	images: string[]
	type: string
	uri: string

	constructor(json: UserJSON) {
		this.displayName = json["display_name"]
		this.spotifyUrl = json["external_urls"]["spotify"]
		this.followers = json["followers"]["total"]
		this.href = json["href"]
		this.id = json["id"]
		this.images = json["images"]
		this.type = json["type"]
		this.uri = json["uri"]
	}
}
