import * as React from "react"

import Main from "./components/Main"
import NotFound from "./components/NotFound"

export default function router(path: string, accessKey: string) {
	switch (path) {
		case "/":
			return <Main accessToken={accessKey} />
		default:
			return <NotFound/>
	}
}