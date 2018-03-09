import * as React from "react"

interface props {
	handler: any
	show: boolean
}

const ResetButton: React.StatelessComponent<props> = (props) => {
	if (props.show) {
		return (
			<div className="reset-button-container">
				<button
					className="reset-button"
					onClick={props.handler}
				>reset</button>
			</div>
		)
	} else {
		return null
	}
}

export default ResetButton