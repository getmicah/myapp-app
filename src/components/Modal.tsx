import * as React from "react"

interface props {
	show: boolean
}

const Modal: React.StatelessComponent<props> = (props) => {
	if (!props.show) {
		return null
	}
	return (
		<div className="modal">
			{props.children}
		</div>
	)
}

export default Modal