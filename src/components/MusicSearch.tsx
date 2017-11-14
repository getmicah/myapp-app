import * as React from "react"

import config from "../utils/config"
import debounce from "../utils/debounce"

interface props {
	type: "artist" | "track"
	delay: number
	handler: any
	keydown: any
	error: any
}

interface state {
	value: string
}

export default class MusicSearch extends React.Component<props, state> {
	placeholder: string

	constructor(props: props) {
		super(props)
		this.state = {
			value: ""
		}
		this.placeholder = `Search for ${props.type} or insert "spotify:${props.type}:uri"`
		this.fetchSearch = debounce(this.fetchSearch.bind(this), this.props.delay, null)
	}

	fetchID(id: string, endpoint: string) {
		const url = `${config.apiURL}/${this.props.type}?id=${id}`
		fetch(url, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error(res.statusText)
				}
				return res.json()
			})
			.then((json) => {
				this.props.error(null)
				this.props.handler([json])
			}).catch((e) => {
				this.props.error(e)
			})
	}

	fetchSearch(query: string) {
		const url = `${config.apiURL}/search?q=${query}&type=${this.props.type}`
		fetch(url, {
			method: "GET",
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw Error()
				}
				return res.json()
			})
			.then((json) => {
				this.props.error(null)
				this.props.handler(json[`${this.props.type}s`].items)
			}).catch((e) => {
				this.props.error(e)
			})
	}

	handleChange(e: React.FormEvent<HTMLInputElement>) {
		const value = e.currentTarget.value
		const uriPrefix = `spotify:${this.props.type}:`
		if (value.substring(0,uriPrefix.length) == uriPrefix) {
			const id = value.substring(uriPrefix.length, value.length)
			this.fetchID(id, this.props.type)
			return
		} else if (value.length > 1) {
			this.fetchSearch(value)
		}
	}

	render() {
		return (
			<input
				type="text"
				onChange={this.handleChange.bind(this)}
				onKeyDown={this.props.keydown}
				placeholder={this.placeholder}
			/>
		)
	}
}