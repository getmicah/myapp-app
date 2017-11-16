import * as React from "react"

import { SpotifyItem, SpotifyItemJSON } from "../models/SpotifyModel"
import * as artistActions from "../actions/ArtistActions"
import * as trackActions from "../actions/TrackActions"

import SpotifySearch from "./SpotifySearch"
import SpotifyToggle from "./SpotifyToggle"
import SpotifyList from "./SpotifyList"

interface KeyboardEvent {
	keyCode: number
	preventDefault: any
}

interface props {
	type: "artist" | "track"
	max: number
	store: any
	actions: any
	toggle: any
	artists: SpotifyItem[]
	tracks: SpotifyItem[]
}

interface state {
	searchValue: string
	searchResults: SpotifyItem[]
	selectedIndex: number
}

export default class SpotifySeeds extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			searchResults: [],
			selectedIndex: -1,
			searchValue: ""
		}
	}

	capitalizeFirstLetter(value: string) {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}

	addByIndex(i: number) {
		let length = this.props.tracks.length
		if (this.props.type === "artist") {
			length = this.props.artists.length
		}
		if (length >= this.props.max) {
			alert(`Only ${this.props.max} ${this.props.type}s allowed`)
			return
		}
		this.props.actions.add(this.state.searchResults[i])
	}

	clearSearch() {
		this.setState({
			searchValue: "",
			searchResults: []
		})
	}

	clearSearchResults() {
		this.setState({searchResults: []})
	}

	handleSearchResults(json: SpotifyItemJSON[]) {
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

	handleSearchChange(e: React.FormEvent<HTMLInputElement>, callback: any) {
		const value = e.currentTarget.value
		this.setState({searchValue: value}, () => {
			if (value.length > 0) {
				callback()
			} else {
				this.setState({selectedIndex: 0})
				this.clearSearchResults()
			}
		})
	}

	handleSearchKeydown(e: KeyboardEvent) {
		switch(e.keyCode) {
			case 13: {
				e.preventDefault()
				const i = this.state.selectedIndex
				const item = this.state.searchResults[i]
				if (item && i > -1) {
					let length = this.props.tracks.length
					if (this.props.type === "artist") {
						length = this.props.artists.length
					}
					if (length >= this.props.max) {
						alert(`Only ${this.props.max} ${this.props.type}s allowed`)
						break
					}
					this.props.actions.add(item)
				}
				break
			}
			case 27 : {
				this.clearSearch()
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

	handleToggleChange(e: React.FormEvent<HTMLInputElement>) {
		if (e.currentTarget.value !== this.props.type) {
			this.clearSearch()
			this.props.toggle()
		}
	}

	render() {
		return (
			<section id="spotify-seeds" className="wrapper">
				<div>
					<span>Search</span>
					<SpotifySearch
						value={this.state.searchValue}
						type={this.props.type}
						delay={200}
						results={this.handleSearchResults.bind(this)}
						onChange={this.handleSearchChange.bind(this)}
						onKeydown={this.handleSearchKeydown.bind(this)}
						clearResults={this.clearSearchResults.bind(this)}
					/>
					<SpotifyToggle
						type={this.props.type}
						onChange={this.handleToggleChange.bind(this)}
					/>
					<SpotifyList
						className="search-results"
						index={this.state.selectedIndex}
						items={this.state.searchResults}
						onItemClick={this.addByIndex.bind(this)}
					/>
				</div>
				<div>
					{this.props.artists.length > 0 ?
					<div className="selected-items">
						<span>Artists</span>
						<SpotifyList
							className={null}
							index={null}
							items={this.props.artists}
							onItemClick={artistActions.removeByIndex}
						/>
					</div>
					: null }
					{this.props.tracks.length > 0 ?
					<div className="selected-items">
						<span>Tracks</span>
						<SpotifyList
							className={null}
							index={null}
							items={this.props.tracks}
							onItemClick={trackActions.removeByIndex}
						/>
					</div>
					: null}
				</div>
			</section>
		)
	}
}