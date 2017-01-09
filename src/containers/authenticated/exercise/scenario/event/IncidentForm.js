import React, {Component, PropTypes} from 'react'
import {reduxForm, change} from 'redux-form'
import R from 'ramda'
import {FormField} from '../../../../../components/Field'
import {T} from '../../../../../components/I18n'
import {SelectField} from '../../../../../components/SelectField'
import {i18nRegister} from '../../../../../utils/Messages'
import {MenuItemLink} from "../../../../../components/menu/MenuItem"

i18nRegister({
  fr: {
    'Name': 'Nom',
    'Title': 'Titre',
    'Type': 'Type',
    'Story': 'Description',
    'Minor': 'Mineur',
    'Medium': 'Moyen',
    'Major': 'Majeur',
    'Significance': 'Importance',
  }
})

const validate = values => {
  const errors = {}
  const requiredFields = ['incident_title', 'incident_type', 'incident_weight', 'incident_story']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

class IncidentForm extends Component {
  render() {
    let weights = [
      {weight_id: 1, weight_name: 'Minor'},
      {weight_id: 3, weight_name: 'Medium'},
      {weight_id: 5, weight_name: 'Major'},
    ]

    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <FormField name="incident_title" fullWidth={true} type="text" label="Title"/>
        <SelectField label={<T>Type</T>} name="incident_type" fullWidth={true}>
          {R.values(this.props.types).map(type => {
            return (<MenuItemLink key={type.type_id} value={type.type_id} label={<T>{type.type_name}</T>}/>)
          })}
        </SelectField>
        <SelectField label={<T>Significance</T>} name="incident_weight" fullWidth={true}>
          {weights.map(weight => {
            return (<MenuItemLink key={weight.weight_id} value={weight.weight_id} label={<T>{weight.weight_name}</T>}/>)
          })}
        </SelectField>
        <FormField name="incident_story" fullWidth={true} multiLine={true} rows={3} type="text" label="Story"/>
      </form>
    )
  }
}

IncidentForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  types: PropTypes.object,
}

export default reduxForm({form: 'IncidentForm', validate}, null, {change})(IncidentForm)