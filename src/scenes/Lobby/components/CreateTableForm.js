import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import { Redirect } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <TextField name="tableNameTextField" hintText="テーブル名を入力してください" />
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
    )
  }
}

export default CreateTableForm;
