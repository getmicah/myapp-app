import * as Cookies from "js-cookie"
import * as moment from "moment"

import Config from "./config"

export function loadLocalStorage(resolve) {
	const accessToken = localStorage.getItem(Config.localStorage.accessToken)
	const refreshToken = localStorage.getItem(Config.localStorage.refreshToken)
	const expiryStr = localStorage.getItem(Config.localStorage.tokenExpiry)
	if (accessToken && refreshToken && expiryStr) {
		const now = moment(new Date())
		const expiry = moment(expiryStr)
		const dur = moment.duration(expiry.diff(now)).asSeconds()
		if (dur < 0){
			// request new tokens
			console.log("token no longer valid")
		}
		resolve(accessToken)
	}
}

export function loadCookies(resolve) {
	const accessToken = Cookies.get(Config.cookie.accessToken);
	const refreshToken = Cookies.get(Config.cookie.refreshToken);
	const tokenExpiry = Cookies.get(Config.cookie.tokenExpiry);
	if (accessToken && refreshToken && tokenExpiry) {
		localStorage.setItem(Config.localStorage.accessToken, accessToken)
		localStorage.setItem(Config.localStorage.refreshToken, refreshToken)
		localStorage.setItem(Config.localStorage.tokenExpiry, tokenExpiry)
		resolve(accessToken)
	}
}

export function clearLocalStorage(resolve) {
	const keys = [
		Config.localStorage.accessToken,
		Config.localStorage.refreshToken,
		Config.localStorage.tokenExpiry
	]
	for (let i = 0; i < keys.length; i++) {
		localStorage.removeItem(keys[i])
	}
	resolve()
}