import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import { Redirect } from 'react-router-dom';
import wallpaperImage from 'assets/wallpaper_001.jpg';

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
        <img
          src={wallpaperImage}
          style={{ position: 'fixed', height: '100vh', filter: 'blur(2px)' }}
          alt="wallpaper"
        />
        <div style={createTableFormStyle}>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <TextField name="tableNameTextField" hintText="Input table name" />
              </div>
              <div>
                <TextField name="smallBlindTextField" hintText="SB" />
              </div>
              <div>
                <TextField name="bigBlindTextField" hintText="BB" />
              </div>
              <div>
                <RaisedButton label="テーブル作成" labelPosition="before" containerElement="label">
                  <input type="submit" style={styles.submitInput} />
                </RaisedButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateTableForm;
