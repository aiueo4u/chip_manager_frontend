import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

const ActionControlField = ({ dispatchBetAction, resetBetSize }) => (
  <div className="actionControlFieldClass">
    <RaisedButton label="Bet" primary={true} onTouchTap={dispatchBetAction} />
    <RaisedButton label="Reset" primary={true} onTouchTap={resetBetSize} />
  </div>
)

ActionControlField.PropTypes = {
  dispatchBetAction: PropTypes.func.isRequired,
  resetBetSize: PropTypes.func.isRequired,
}

export default ActionControlField;
