import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

const BetActionControlField = ({ foldAction, checkable, checkAction, callable, callAction }) => (
  <div className="flexRowContainer">
    <RaisedButton
      label="Fold"
      primary={true}
      onTouchTap={foldAction}
    />
    <RaisedButton
      disabled={!checkable}
      label="Check"
      primary={true}
      onTouchTap={checkAction}
    />
    <RaisedButton
      disabled={!callable}
      label="Call"
      primary={true}
      onTouchTap={callAction}
    />
  </div>
)

BetActionControlField.PropTypes = {
  checkAction: PropTypes.func.isRequired,
  foldAction: PropTypes.func.isRequired,
  callAction: PropTypes.func.isRequired,
  checkable: PropTypes.bool.isRequired,
  callable: PropTypes.bool.isRequired,
}

export default BetActionControlField;
