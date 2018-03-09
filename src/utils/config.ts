interface config {
	auth: {
		authorizeURL: string
		tokenURL: string
		redirect: string
		scope: string[]
	}
	cookie: {
		state: string
		accessToken: string
		refreshToken: string
		tokenExpiry: string
	}
	localStorage: {
		accessToken: string
		refreshToken: string
		tokenExpiry: string
	}
	env: {
		spotifyID: string
		spotifySecret: string
	}
	path: string
	port: number
	apiURL: string
	appURL: string
}

const Config: config = require("../../config/config.local.json")

export default Config