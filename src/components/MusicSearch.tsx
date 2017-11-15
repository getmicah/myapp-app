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
	placeholderText: string

	constructor(props: props) {
		super(props)
		this.state = {
			value: ""
		}
		this.placeholderText = `Search for ${props.type} or insert "spotify:${props.type}:uri"`
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
			}).catch((e: ErrorConstructor) => {
				if (e.toString()) {
					this.props.error(e.toString)
				} else {
					this.props.error(e+"")
				}
			})
	}

	handleNewQuery() {
		const uriPrefix = `spotify:${this.props.type}:`
		const query = this.state.value
		if (query.substring(0,uriPrefix.length) == uriPrefix) {
			const id = query.substring(uriPrefix.length, query.length)
			this.fetchID(id, this.props.type)
			return
		} else if (query.length > 1) {
			this.fetchSearch(query)
		}
	}

	handleChange(e: React.FormEvent<HTMLInputElement>) {
		const value = e.currentTarget.value
		this.setState({value: value}, this.handleNewQuery.bind(this))
		
	}

	render() {
		return (
			<input
				type="text"
				onChange={this.handleChange.bind(this)}
				onKeyDown={this.props.keydown}
				placeholder={this.placeholderText}
				value={this.state.value}
			/>
		)
	}
}