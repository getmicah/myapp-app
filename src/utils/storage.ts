import * as Cookies from "js-cookie"
import * as moment from "moment"

import Config from "../config"

export function clearLocalStorage() {
	const keys = [
		Config.localStorage.accessToken,
		Config.localStorage.refreshToken,
		Config.localStorage.tokenExpiry
	]
	for (let i = 0; i < keys.length; i++) {
		localStorage.removeItem(keys[i])
	}
}

export function checkLocalStorage(resolve) {
	const accessToken = localStorage.getItem(Config.localStorage.accessToken)
	const refreshToken = localStorage.getItem(Config.localStorage.refreshToken)
	const expiryStr = localStorage.getItem(Config.localStorage.tokenExpiry)
	if (accessToken && refreshToken && expiryStr) {
		const now = moment(new Date())
		const expiry = moment(expiryStr)
		const dur = moment.duration(expiry.diff(now)).asSeconds()
		if (dur < 0){
			// request new tokens
			return
		}
		resolve(accessToken)
	}
}

export function checkCookies(resolve) {
	const accessToken = Cookies.get(Config.cookie.spotifyAccessToken);
	const refreshToken = Cookies.get(Config.cookie.spotifyRefreshToken);
	const tokenExpiry = Cookies.get(Config.cookie.spotifyTokenExpiry);
	if (accessToken && refreshToken && tokenExpiry) {
		localStorage.setItem(Config.localStorage.accessToken, accessToken)
		localStorage.setItem(Config.localStorage.refreshToken, refreshToken)
		localStorage.setItem(Config.localStorage.tokenExpiry, tokenExpiry)
		resolve(accessToken)
	}
}