import * as React from "react"

import { SpotifyItem, SpotifyItemJSON } from "../models/SpotifyModel"

import MusicSearch from "./MusicSearch"
import SpotifyList from "./SpotifyList"

interface KeyboardEvent {
	keyCode: number
	preventDefault: any
}

export interface props {
	className: string
	type: "artist" | "track"
	store: any
	actions: any
	next: any
	back: any
}

export interface state {
	selected: SpotifyItem[]
	searchResults: SpotifyItem[]
	selectedIndex: number
	error: string
}

export default class Section extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			selected: props.store.get(),
			searchResults: [],
			selectedIndex: -1,
			error: null
		}
	}

	updateSelected() {
		this.setState({selected: this.props.store.get()})
	}

	addByIndex(i: number) {
		if (this.state.selected.length >= 5) {
			this.setState({error: `Only 5 ${this.props.type}s allowed`})
			return
		}
		this.props.actions.add(this.state.searchResults[i])
	}

	handleSearch(json: SpotifyItemJSON[]) {
		const results: SpotifyItem[] = []
		if (json.length > 0) {
			for (let i = 0; i < json.length; i++) {
				const item = new SpotifyItem(json[i])
				let original = true
				for (let j = 0; j < results.length; j++) {
					if (results[j].name == item.name) {
						original = false
					}
				}
				if (original) {
					results.push(item)
				}
			}
			this.setState({selectedIndex: -1})
			this.setState({searchResults: results})
		}
	}

	handleSearchKeyDown(e: KeyboardEvent) {
		switch(e.keyCode) {
			case 13: {
				e.preventDefault()
				const i = this.state.selectedIndex
				const item = this.state.searchResults[i]
				if (item && i > -1) {
					if (this.state.selected.length >= 5) {
						this.setState({error: `Only 5 ${this.props.type}s allowed`})
						break
					}
					this.props.actions.add(item)
				}
				break
			}
			case 38: {
				e.preventDefault()
				const i = this.state.selectedIndex
				if (i > -1) {
					this.setState({selectedIndex: i-1})
				}
				break
			}
			case 40: {
				e.preventDefault()
				const i = this.state.selectedIndex
				if (i < this.state.searchResults.length-1) {
					this.setState({selectedIndex: i+1})
				}
				break
			}
		}
	}

	handleSearchError(e: string) {
		this.setState({error: e})
	}

	componentWillMount() {
		this.props.store.on("change", this.updateSelected.bind(this))
	}

	render() {
		return (
			<section className={this.props.className}>
				<h2>Add {this.props.type}s</h2>
				<MusicSearch 
					type={this.props.type}
					delay={200}
					handler={this.handleSearch.bind(this)}
					keydown={this.handleSearchKeyDown.bind(this)}
					error={this.handleSearchError.bind(this)}
				/>
				{this.state.error ? <span>{this.state.error}</span> : null}
				<SpotifyList
					selected={this.state.selectedIndex}
					items={this.state.searchResults}
					onItemClick={this.addByIndex.bind(this)}
				/>
				<SpotifyList
					selected={null}
					items={this.state.selected}
					onItemClick={this.props.actions.removeByIndex}
				/>
				{this.props.back ? <button onClick={this.props.back}>Back</button> : null}
				<button onClick={this.props.next}>Next</button>
			</section>
		)
	}
}