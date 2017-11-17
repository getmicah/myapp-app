import * as React from "react"

interface props {
	text: string
	handler: any
}

const MainButton: React.StatelessComponent<props> = (props) => {
	return (
		<div className="main-button-container">
			<button
				className="main-button"
				onClick={props.handler}
			>{props.text}</button>
		</div>
	)
}

export default MainButton