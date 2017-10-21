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

Table of paramters that the updateProperty function takes.

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
 =export default Form(Class, 'myForm')
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
