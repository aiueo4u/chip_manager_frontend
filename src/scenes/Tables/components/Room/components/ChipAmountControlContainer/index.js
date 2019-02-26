import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
} from '@material-ui/core'
import './style.css';

const ChipAmountControlContainer = ({ incrementBetSize }) => (
  <div className="chipFieldContainer">
    <div style={{ width: '18%', height: '100%', margin: '1%', bottom: '-20px', position: 'relative' }}>
      <Button fullWidth variant="outlined" color="primary" onClick={() => incrementBetSize(25)} style={{ background: 'white' }}>
        25
      </Button>
    </div>
    <div style={{ width: '18%', height: '100%', margin: '1%', bottom: '-20px', position: 'relative' }}>
      <Button fullWidth variant="outlined" color="primary" onClick={() => incrementBetSize(100)} style={{ background: 'white' }}>
        100
      </Button>
    </div>
    <div style={{ width: '20%' }} />
    <div style={{ width: '18%', height: '100%', margin: '1%', bottom: '-20px', position: 'relative' }}>
      <Button fullWidth variant="outlined" color="primary" onClick={() => incrementBetSize(500)} style={{ background: 'white' }}>
        500
      </Button>
    </div>
    <div style={{ width: '18%', height: '100%', margin: '1%', bottom: '-20px', position: 'relative' }}>
      <Button fullWidth variant="outlined" color="primary" onClick={() => incrementBetSize(1000)} style={{ background: 'white' }}>
        1000
      </Button>
    </div>
  </div>
)

ChipAmountControlContainer.propTypes = {
  playerOnTurn: PropTypes.object.isRequired,
  operatingPlayer: PropTypes.object,
  incrementBetSize: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { playerOnTurn } = ownProps;

  return {
    incrementBetSize: (amount) => {
      dispatch({
        type: "INCREMENT_BET_SIZE",
        playerId: playerOnTurn.id,
        playerStack: playerOnTurn.stack,
        amount: amount,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChipAmountControlContainer);
