import React from 'react'
import PropTypes from 'prop-types'

class Select extends React.Component {
  constructor (props {
    super(props)
		this.state = {isFocused: false}
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
        <select
          className={inputClasses.join(' ')}
        	...this.props
          onChange={this.onChange.bind(this)}
					onFocus={this.onFocus.bind(this)}
        >
          <option value=''>{placeholder || 'Select...'}</option>
          {
            select.options.map((option,index)=>{
              return (
                <option
                  key={index}
                  value={option.value || option.id || option.name}>{option.name}
                </option>
              )
            })
          }

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
	inputActiveClass: PropTypes.stirng,
	inputErrorClass: PropTypes.string,
	label: PropTypes.string,
	labelClass: PropTypes.string,
	labelActiveClass: PropTypes.string,
	labelErrorClass: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
  options: PropTypes.Araay.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.instanceOf(Date)],
    PropTypes.instanceOf(Object)
	).isRequired
}

export default Select
