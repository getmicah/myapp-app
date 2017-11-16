import * as React from "react"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface props {
	name: string
	descriptors: [string, string]
	value: number
	max: number
	min: number
	step: number
	onChange: any
}

const TuningSlider: React.StatelessComponent<props> = (props) => {
	return (
		<div>
			<span className="rc-slider-name">{props.name}</span>
			<Slider
				className={`${props.value == null ? "disabled" : null}`}
				value={props.value == null ? (props.max+props.min)/2 : props.value}
				max={props.max}
				min={props.min}
				step={props.step}
				onChange={props.onChange}
			/>
			<div className="rc-slider-descriptors">
				<span>{props.descriptors[0]}</span>
				<span>{props.descriptors[1]}</span>
			</div>
		</div>
	)
}

export default TuningSlider