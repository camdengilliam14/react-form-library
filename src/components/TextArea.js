import React from 'react'
import PropTypes from 'prop-types'

class TextArea extends React.Component {
  constructor (props {
    super(props)
		this.state = {isFocused: false}
  }

	onBlur () {
		this.setState({isFocused: false})
		if (this.props.onBlur) this.props.onBlur()
	}

  onChange (event) {
    this.props.onChange(event.target.name, event.target.value)
  }

	onFocus () {
		this.setState({isFocused: true})
		if (this.props.onFocus) this.props.onFocus()
	}

  render () {
    const containerClasses = []
		const labelClasses = []
		const inputClasses = []

		const {containerClass, labelClass, inputClass,
				containerActiveClass, labelActiveClass, inputActiveClass,
			 containerErrorClass, labelErrorClass, inputErrorClass,
			 id, label
		 } = this.props

		if (containerClass) containerClasses.push(containerClass)
		if (labelClass) labelClasses.push(labelClass)
		if (inputClass) inputClasses.push(inputClass)

		if (this.state.active) {
			if (containerActiveClass) containerClasses.push(containerActiveClass)
			if (labelActiveClass) containerClasses.push(labelActiveClass)
			if (inputActiveClass) containerClasses.push(inputActiveClass)
		}

		if (this.props.error ) {
			if (containerErrorClass) containerClasses.push(containerErrorClass)
			if (labelErrorClass) labelClasses.push(labelErrorClass)
			if (inputErrorClass) inputClasses.push(inputErrorClass)
		}

    return (
			<div className={containerClasses.join(' ')}>
        {label ?
					<label className={labelClasses.join(' ')} htmlFor={id}>
						{label}
					</label>
				}
        <textarea
          className={inputClasses.join(' ')}
        	...this.props
					onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
					onFocus={this.onFocus.bind(this)}
        />
      </div>
    )
  }
}

TextArea.propTypes = {
	containerClass: PropTypes.string,
	containerActiveClass: PropTypes.string,
	containerErrorClass: PropTypes.string,
	id: PropTypes.string,
	inputClass: PropTypes.string,
	inputActiveClass: PropTypes.stirng,
	inputErrorClass: PropTypes.string,
	label: PropTypes.string,
	labelClass: PropTypes.string,
	labelActiveClass: PropTypes.string,
	labelErrorClass: PropTypes.string,
	name: PropTypes.string.isRequired,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
	value: PropTypes.oneOfType([
		PropTypes.string
	).isRequired
}

export default TextArea