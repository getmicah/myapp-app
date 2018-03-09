import * as React from "react"

interface props {
	class: string
	disabled: boolean
	handler: any
	text: string
}

const MainButton: React.StatelessComponent<props> = (props) => {
	return (
		<div className="main-button-container">
			<button
				className={`main-button animated ${props.class}`}
				onClick={props.handler}
				disabled={props.disabled}
			>{props.text}</button>
		</div>
	)
}

export default MainButton