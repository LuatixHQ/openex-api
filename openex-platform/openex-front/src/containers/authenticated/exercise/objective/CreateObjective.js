import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { i18nRegister } from '../../../../utils/Messages';
import * as Constants from '../../../../constants/ComponentTypes';
import { addObjective } from '../../../../actions/Objective';
import ObjectiveForm from './ObjectiveForm';

i18nRegister({
  fr: {
    'Create a new objective': 'Créer un nouvel objectif',
  },
});

class CreateObjective extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  onSubmit(data) {
    return this.props.addObjective(this.props.exerciseId, data);
  }

  submitForm() {
    this.refs.objectiveForm.submit();
  }

  render() {
    const actions = [
      <Button
        key="cancel"
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <Button
        key="create"
        label="Create"
        primary={true}
        onClick={this.submitForm.bind(this)}
      />,
    ];

    return (
      <div>
        <Fab
          type={Constants.BUTTON_TYPE_FLOATING}
          onClick={this.handleOpen.bind(this)}
        />
        <Dialog
          title="Create a new objective"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          actions={actions}
        >
          <ObjectiveForm
            ref="objectiveForm"
            onSubmit={this.onSubmit.bind(this)}
            onSubmitSuccess={this.handleClose.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}

CreateObjective.propTypes = {
  exerciseId: PropTypes.string,
  addObjective: PropTypes.func,
};

export default connect(null, { addObjective })(CreateObjective);
