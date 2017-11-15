import * as React from "react"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface props {
	name: string
	descriptor: [string, string]
	value: number
	max: number
	min: number
	step: number
	onChange: any
}

const SeedSlider: React.StatelessComponent<props> = (props) => {
	return (
		<div className={`seed-slider ${props.value == null ? "disabled" : null}`}>
			<h4>{props.name}</h4>
			<Slider
				value={props.value == null ? (props.max+props.min)/2 : props.value}
				max={props.max}
				min={props.min}
				step={props.step}
				onChange={props.onChange}
			/>
			<span>{props.descriptor[0]} - {props.descriptor[1]}</span>
		</div>
	)
}

export default SeedSlider