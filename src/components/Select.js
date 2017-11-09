import React from 'react'
import PropTypes from 'prop-types'

class Select extends React.Component {
  constructor (props) {
    super(props)
		this.state = {isFocused: false}
  }

  onBlur (event) {
    this.setState({isFocused: false})
		if (this.props.onBlur) this.props.onBlur()
  }

  onChange (event) {
    this.props.onChange(event.target.name, event.target.value)
    this.setState({isFocused: false})
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
			 id, label, placeholder
		 } = this.props

		if (containerClass) containerClasses.push(containerClass)
		if (labelClass) labelClasses.push(labelClass)
		if (inputClass) inputClasses.push(inputClass)

		if (this.state.isFocused) {
      if (containerActiveClass) containerClasses.push(containerActiveClass)
			if (labelActiveClass) labelClasses.push(labelActiveClass)
			if (inputActiveClass) inputClasses.push(inputActiveClass)
		}

		if (this.props.error ) {
			if (containerErrorClass) containerClasses.push(containerErrorClass)
			if (labelErrorClass) labelClasses.push(labelErrorClass)
			if (inputErrorClass) inputClasses.push(inputErrorClass)
		}

    const input = this.props
    return (
			<div className={containerClasses.join(' ')}>
        {label ?
					<label className={labelClasses.join(' ')} htmlFor={id}>
						{label}
					</label> : null
				}
        <select
          className={inputClasses.join(' ')}
          id={input.id}
          name={input.name}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
					onFocus={this.onFocus.bind(this)}
          value={input.value}
        >
          <option value=''>{placeholder || 'Select...'}</option>
          {
            this.props.options.map((option,index)=>{
              return (
                <option
                  key={index}
                  value={option.value || option.id || option.name}>{option.name}
                </option>
              )
            })
          }
        </select>
      </div>
    )
  }
}

Select.propTypes = {
	containerClass: PropTypes.string,
	containerActiveClass: PropTypes.string,
	containerErrorClass: PropTypes.string,
	id: PropTypes.string,
	inputClass: PropTypes.string,
	inputActiveClass: PropTypes.string,
	inputErrorClass: PropTypes.string,
	label: PropTypes.string,
	labelClass: PropTypes.string,
	labelActiveClass: PropTypes.string,
	labelErrorClass: PropTypes.string,
	name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
  options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.instanceOf(Date)],
    PropTypes.instanceOf(Object)
	).isRequired
}

export default Select
