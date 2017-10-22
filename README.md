## About
This directory contains the project that implements a solution for sharing common form functionality among react form components.
## Exports
#### Form (wrapper function)
Provides an update property to use for your form fields.
###### 'Form' Function Parameters

Table of parameters that the wrapper function takes.

| Params        | Type          | Description                                           |
| ------------- |:--------------| ------------------------------------------------------|
| component     | Component     | The component to wrap.                                |
| formKey       | String        | The object key of your form object declared in state. |

###### Provided Props

Table of props the wrapper function provides to the component.

| Props          | Type          | Description                                          |
| -------------  |:--------------| -----------------------------------------------------|
| updateProperty | Component     | Function to update form field with new value.        |

###### 'updateProperty' Function Parameters

Table of parameters that the updateProperty function takes.

| Params        | Type         | Description                                         |
| ------------- |:-------------| ----------------------------------------------------|
| key           | String       | The key of the form object to update. Allows dot notation, i.e. 'user.profile.first_name'. |
| value         | Any          | The new value to be set.                            |


##### Usage
Example.
````
import React from 'react'
import {Form} from 'react-form-library'
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myForm: {
        profile: {
          first_name: ''
          }
        }
      }
    }

    render (
      const {updateProperty} = this.props
      return (
        <input
          name="profile.first_name"
          value={this.state.myForm.profile.first_name}
          onChange=((event) => updateProperty("profile.first_name", event.target.value))
        />
      )
    )
}
export default Form(Class, 'myForm')
````

##### Suggested Usage
Create a class for your form components in order to easily handle the update property.
```
import React from 'react'
import {Form} from 'react-form-library'

class InputField extends React.Component {
    onChange (event) {
        this.props.onChange(this.props.name, event.target.value)
    }
    render (
        return (
         <input
           ...this.props
           value={this.props.value}
           onChange={this.onChange.bind(this)}
         />
        )
    )
}

class Class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myForm: {
                profile: {
                    first_name: ''
                }
            }
        }
     }

     render (
       const {updateProperty} = this.props
       const {myForm} = this.state
       return (
         <InputField
           name="profile.first_name"
           value={myForm.profile.first_name}
           onChange=(updateProperty)
         />
       )
     )
 }
 export default Form(Class, 'myForm')
 ```

### ValidateForm (wrapper function)
Provides form validation on submit to your form
###### ValidateForm Function Parameters

Table of parameters the ValidateForm function takes.

| Params        | Type          | Description                                          |
| ------------- |:--------------| -----------------------------------------------------|
| component     | Component     | The component to wrap                                |


###### Provided Props

Table of props the wrapper function provides to the component.

| Props           | Type          | Description                                          |
| --------------- |:--------------| -----------------------------------------------------|
| formErrors      | Object        | The key value pair containing fields with errors.    |
| validateForm    | Func          | The function to validate the form provided.          |
| resetValidation | Func          | The function to reset the formErrors object          |

###### 'validateForm' Function Parameters

Table of paramaters the validateForm function takes.

| Params         | Type          | Description                         |
| -------------- |:--------------| ------------------------------------|
| form           | Object        | The form object.                    |
| requiredFields | Object        | The required fields to be validated |

 ###### 'requiredFields' Supported Keys

 Table of keys validateForm recongizes.

| Key            | Type          | Description                                                     |
| -------------- |:--------------| ----------------------------------------------------------------|
| type           | String        | The type of validation for the field, i.e required, email, etc. |
| message        | String        | Custom message to be returned on key value pair for formErrors. This can be useful if you want to display a custom message by rendered by your input.|
| validate       | Func          | Custom validation function.                                     |

###### 'validate' Function

Custom validate function properties.

| Attr.          | Type          | Description                                         |
| -------------- |:--------------| ----------------------------------------------------|
| param          | Any           | The value to validate against.                      |
| return         | Bool          | True/false indicator whether the validation passes. |


##### Usage
Ex.
```
import React from 'react'
import {ValidateForm} from 'react-form-library'

const requiredFields = {
    "profile.first_name": {
      type: 'required'
    },
    "email": {
      type: 'email',
      message: 'Provide a valid email',
    },
    "facility": {
      validate: (value) => {return value === 'myfacility'},
      message: 'The facility does not exist in our system'
    }
}

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: {
      profile: {
        first_name: ''
      },
      email: '',
      facility: ''
    }}
  }

  onSubmit() {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      ///fires off some api call
      api.submitForm(form).then(() => {
        this.props.resetValidation();
      }).catch(() => false)
    }
  }

  render (
    const {formErrors} = this.props;
    const {form} = this.state
    return (
      <div>
        <InputField
          ...
          hasError={formErrors.profile && formErrors.profile.first_name}
          value={form.profile.first_name}
        />
        <InputField
          ...
          hasError={formErrors.last_name}
          value={form.email}
        />
        <InputField
          ...
          hasError={formErrors.last_name}
          value={form.facility}
        />
        <button onClick={this.onSubmit.bind(this)}>Submit</button>
      </div>
    )
  )
}

export default ValidateForm(Class)
```

## Components
### Input
Form input field.
###### Input Props
Input props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| containerClass        | String          | Class to style the input container.                  |
| containerActiveClass  | String          | Class to style the input container when input is active. Input sets the active class onFocus. Input removes the active class onBlur.|
| containerErrorClass   | String          | Class to style the input container when the error prop is set to true. |
| error                 | Boolean         | Flag indicating whether form validation failed. Sets error classes when true. |
| id                    | String          | Id of the input form element.                        |
| inputClass            | String          | Class to style the input form element.               |
| inputActiveClass      | String          | Class to style the input form element when input is active. Input sets the active class onFocus. Input removes the active class onBlur.|
| inputErrorClass       | String          | Class to style the input form element when the error prop is set to true. |
| label                 | String          | Label text for the form element.                     |                   
| labelClass            | String          | Class to style the label on the input form element.  |
| labelActiveClass      | String          | Class to style the label on the input form element when input is active. Input sets the active class onFocus. Input removes the active class onBlur.|
| inputErrorClass       | String          | Class to style the label on the input form element when the error prop is set to true. |
| name                  | String          | Name of the input form element. Should be the same as the form field key.              |
| onBlur                | Func            | Custom onBlur function.                              |
| onChange              | Func            | onChange prop provided by Form library.              |
| onFocus               | Func            | Custom onFocus function.                             |
| placeholder           | String          | Placeholder text for the form input.                 |
| type                  | String          | Form input type.                                     |
| value                 | String, Number, Date | Value of the input field.                       |

##### Usage
Ex.
```
import React from 'react'
import {Input, Form, ValidateForm} from 'react-form-library'
class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        profile: {
          first_name: ''
        }
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <Input
        containerClass="input-container"
        containerActiveClass="active"
        containerErrorClass="error"
        error={formErrors.profile && formErrors.profile.first_name}
        id="first_name"
        inputClass="form-input"
        inputActiveClass="active"
        inputErrorClass="error"
        label="First Name"
        labelClass="input-label"
        labelActiveClass="active"
        labelErrorClass="error"
        name="profile.first_name"
        onBlur={() => console.log("onBlur")}
        onChange={updateProperty}
        onFocus={() => console.log("onFocus")}
        placeholder="First Name"
        type="text"
        value={form.profile.first_name}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```

### Select
Form select field.
###### Select Props
Select props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| containerClass        | String          | Class to style the select container.                 |
| containerActiveClass  | String          | Class to style the select container when select is active. Select sets the active class onFocus. Select removes the active class onBlur.|
| containerErrorClass   | String          | Class to style the select container when the error prop is set to true. |
| error                 | Boolean         | Flag indicating whether form validation failed. Sets error classes when true. |
| id                    | String          | Id of the select form element.                       |
| inputClass            | String          | Class to style the select form element.              |
| inputActiveClass      | String          | Class to style the select form element when select is active. Select sets the active class onFocus. Input removes the active class onChange.|
| inputErrorClass       | String          | Class to style the select form element when the error prop is set to true. |
| label                 | String          | Label text for the form element.                     |                   
| labelClass            | String          | Class to style the label on the select form element. |
| labelActiveClass      | String          | Class to style the label on the select form element when select is active. Select sets the active class onFocus. Select removes the active class onChange.|
| inputErrorClass       | String          | Class to style the label on the select form element when the error prop is set to true. |
| name                  | String          | Name of the select form element. Should be the same as the form field key.              |
| onChange              | Func            | onChange prop provided by Form library.              |
| onFocus               | Func            | Custom onFocus function.                             |
| options               | Array           | Select options. Should be an array of objects. {value, name}. If 'value' is not set, select looks for an 'id'. Else it uses 'name' as the onChange value.}
| placeholder           | String          | First select option label text. Defaults to Select...|
| value                 | String, Number, Date | Value of the input field.                       |

##### Usage
Ex.
```
import React from 'react'
import {Select, Form, ValidateForm} from 'react-form-library'

const options = [
  {value: 1, name: 'Value 1'},
  {value: 2, name: 'Value 2'},
  {value: 3, name: 'Value 3'}
]

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        selectValue: ''
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <Select
        containerClass="input-container"
        containerActiveClass="active"
        containerErrorClass="error"
        error={formErrors.selectValue}
        id="selectValue"
        inputClass="form-input"
        inputActiveClass="active"
        inputErrorClass="error"
        label="Select Value"
        labelClass="input-label"
        labelActiveClass="active"
        labelErrorClass="error"
        name="selectValue"
        onChange={updateProperty}
        onFocus={() => console.log("onFocus")}
        options={options}
        placeholder="Choose a Value..."
        value={form.selectValue}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```
### TextArea
Form textarea field.
###### Input Props
TextArea props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| containerClass        | String          | Class to style the textarea container.               |
| containerActiveClass  | String          | Class to style the textarea container when textarea is active. TextArea sets the active class onFocus. TextArea removes the active class onBlur.|
| containerErrorClass   | String          | Class to style the textarea container when the error prop is set to true. |
| error                 | Boolean         | Flag indicating whether form validation failed. Sets error classes when true. |
| id                    | String          | Id of the textarea form element.                        |
| inputClass            | String          | Class to style the textarea form element.               |
| inputActiveClass      | String          | Class to style the textarea form element when textarea is active. TextArea sets the active class onFocus. TextArea removes the active class onBlur.|
| inputErrorClass       | String          | Class to style the textarea form element when the error prop is set to true. |
| label                 | String          | Label text for the form element.                     |                   
| labelClass            | String          | Class to style the label on the textarea form element.  |
| labelActiveClass      | String          | Class to style the label on the textarea form element when textarea is active. TextArea sets the active class onFocus. TextArea removes the active class onBlur.|
| inputErrorClass       | String          | Class to style the label on the textarea form element when the error prop is set to true. |
| name                  | String          | Name of the textarea form element. Should be the same as the form field key.              |
| onBlur                | Func            | Custom onBlur function.                              |
| onChange              | Func            | onChange prop provided by Form library.              |
| onFocus               | Func            | Custom onFocus function.                             |
| placeholder           | String          | Placeholder text for the form textarea.              |
| value                 | String          | Value of the input field.                            |

##### Usage
Ex.
```
import React from 'react'
import {TextArea, Form, ValidateForm} from 'react-form-library'
class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        profile: {
          bio: ''
        }
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <TextArea
        containerClass="input-container"
        containerActiveClass="active"
        containerErrorClass="error"
        error={formErrors.profile && formErrors.profile.bio}
        id="bio"
        inputClass="form-input"
        inputActiveClass="active"
        inputErrorClass="error"
        label="Biography"
        labelClass="input-label"
        labelActiveClass="active"
        labelErrorClass="error"
        name="profile.bio"
        onBlur={() => console.log("onBlur")}
        onChange={updateProperty}
        onFocus={() => console.log("onFocus")}
        placeholder="Biography"
        value={form.profile.bio}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```

#### Recommended Usage of Components
It is recommended that you wrap these components in your own component, defining the styles in the component wrapper. This way, you do not have to provide style classes to every form element you use.
Ex.

```
import React from 'react'
import {Input} from 'react-form-library'
class InputField extends React.Component {
  render () {

    return (
      <Input
        containerClass="input-container"
        containerActiveClass="active"
        containerErrorClass="error"
        inputClass="form-input"
        inputActiveClass="active"
        inputErrorClass="error"
        labelClass="input-label"
        labelActiveClass="active"
        labelErrorClass="error"
        {...this.props}
      />
    )
  }
}

export default InputField

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        profile: {
          first_name: ''
        }
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <InputField
        error={formErrors.profile && formErrors.profile.first_name}
        label="First Name"
        name="profile.first_name"
        onBlur={() => console.log("onBlur")}
        onChange={updateProperty}
        onFocus={() => console.log("onFocus")}
        placeholder="First Name"
        value={form.profile.first_name}
      />
    )
  }
}
export default ValidateForm(Form(Class, 'form'))
```



## License
Copyright (2017)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
