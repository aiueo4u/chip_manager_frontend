import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import WallPaperImage from 'components/WallPaperImage';

const styles = {
  submitInput: { // デフォルトのサブミットボタンは見えなくする
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0,
  }
}

const createTableFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'fixed',
  height: '50%',
  width: '80%',
  textAlign: 'center',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(200, 200, 200, 0.3)',
  borderRadius: '30px',
}

class CreateTableForm extends Component {
  componentWillUnmount() {
    this.props.clearForm()
  }

  render() {
    const { tableId, isTableCreated, isFetching, handleSubmit } = this.props;

    if (isTableCreated) {
      return (<Redirect to={`/tables/${tableId}`} />)
    }

    return isFetching ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
      <div>
        <WallPaperImage />
        <div style={createTableFormStyle}>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <TextField name="tableNameTextField" placeholder="Input table name" />
              </div>
              <div>
                <TextField name="smallBlindTextField" placeholder="SB" />
              </div>
              <div>
                <TextField name="bigBlindTextField" placeholder="BB" />
              </div>
              <div>
                <Button variant="raised" component="label">
                  テーブル作成
                  <input type="submit" style={styles.submitInput} />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateTableForm;
