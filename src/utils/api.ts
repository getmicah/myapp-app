import config from "./config"
import { SpotifyItem } from "../models/SpotifyModel"

export function getAuth(): Promise<null> {
	return new Promise<null> ((resolve, reject) => {
		fetch(`${config.apiURL}/auth`, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					return reject(res.status)
				}
				resolve()
			})
			.catch(() => reject())
	})
}

export function getRec(artists: SpotifyItem[], tracks: SpotifyItem[], danceability: number, energy: number, popularity: number, valence: number): Promise<any> {
	return new Promise<any> ((resolve, reject) => {
		const a = artists.map((item) => {
			return item.id;
		}).join(",");
		const t = tracks.map((item) => {
			return item.id;
		}).join(",");
		let url = `${config.apiURL}/rec?seed_artists=${a}&seed_tracks=${t}`
		if (danceability != null) {
			url += `&target_danceability=${danceability}`
		}
		if (energy != null) {
			url += `&target_energy=${energy}`
		}
		if (popularity != null) {
			url += `&target_popularity=${popularity}`
		}
		if (valence != null) {
			url += `&target_valence=${valence}`
		}
		fetch(url, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					return reject(res.status)
				}
				return res.json()
			})
			.then(resolve)
			.catch(() => reject())
	})
}

export function postPlaylist(json): Promise<any> {
	return new Promise<any> ((resolve, reject) => {
		const body = {uris: []}
		for (let i = 0; i < json.tracks.length; i++) {
			body.uris.push(json.tracks[i].uri)
		}
		fetch(`${config.apiURL}/playlist`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(body),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.then((res) => {
				if (!res.ok) {
					return reject(res.status)
				}
				return res.json()
			})
			.then(resolve)
			.catch(() => reject())
	})
}

export function getId(id: string, endpoint: string): Promise<any> {
	return new Promise<any> ((resolve, reject) => {
		const url = `${config.apiURL}/${endpoint}?id=${id}`
		fetch(url, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					return reject(res.status)
				}
				return res.json()
			})
			.then(resolve)
			.catch(() => reject())
	})
}

export function getSearch(query: string, type: string): Promise<any> {
	return new Promise<any> ((resolve, reject) => {
		const url = `${config.apiURL}/search?q=${query}&type=${type}`
		fetch(url, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					return reject(res.status)
				}
				return res.json()
			})
			.then(resolve)
			.catch(() => reject())
	})
}