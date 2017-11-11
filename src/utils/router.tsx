import * as React from "react"

import Main from "../components/Main"
import NotFound from "../components/NotFound"

export default function router() {
	const path = window.location.pathname
	switch (path) {
		case "/":
			return <Main />
		default:
			return <NotFound/>
	}
}