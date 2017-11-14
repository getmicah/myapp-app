import * as React from "react"

import { SpotifyItem, SpotifyItemJSON } from "../models/SpotifyModel"
import spotifyStore from "../stores/SpotifyStore"
import * as spotifyActions from "../actions/SpotifyActions"

import MusicSearch from "./MusicSearch"
import SearchResults from "./SearchResults"
import SelectedItems from "./SelectedItems"

interface KeyboardEvent {
	keyCode: number
	preventDefault: any
}

interface props {
	next: any
}

interface state {
	selected: SpotifyItem[]
	searchResults: SpotifyItem[]
	selectedIndex: number
	error: string
}

export default class AddArtists extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {
			selected: spotifyStore.getArtists(),
			searchResults: [],
			selectedIndex: -1,
			error: null
		}
	}

	updateSelected() {
		this.setState({selected: spotifyStore.getArtists()})
	}

	addArtistByIndex(i: number) {
		if (this.state.selected.length >= 5) {
			this.setState({error: "Only 5 artists allowed"})
			return
		}
		spotifyActions.addArtist(this.state.searchResults[i])
	}

	removeArtistByIndex(i: number) {
		spotifyActions.removeArtistByIndex(i)
	}

	handleSearch(json: SpotifyItem[]) {
		const results = []
		if (json.length > 0) {
			for (let i = 0; i < json.length; i++) {
				results.push(new SpotifyItem(json[i]))
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
				const artist = this.state.searchResults[i]
				if (artist && i > -1) {
					if (this.state.selected.length >= 5) {
						this.setState({error: "Only 5 artists allowed"})
						break
					}
					spotifyActions.addArtist(artist)
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
		spotifyStore.on("change", this.updateSelected.bind(this))
	}

	render() {
		return (
			<div>
				<MusicSearch 
					type="artist"
					delay={200}
					handler={this.handleSearch.bind(this)}
					keydown={this.handleSearchKeyDown.bind(this)}
					error={this.handleSearchError.bind(this)}
				/>
				{this.state.error ? <span>{this.state.error}</span> : null}
				<SearchResults
					selected={this.state.selectedIndex}
					items={this.state.searchResults}
					add={this.addArtistByIndex.bind(this)}
				/>
				<SelectedItems
					items={this.state.selected}
					remove={this.removeArtistByIndex.bind(this)}
				/>
			</div>
		)
	}
}