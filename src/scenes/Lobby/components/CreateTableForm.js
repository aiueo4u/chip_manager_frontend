import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

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
  render() {
    const { isFetching, handleSubmit } = this.props;

    return isFetching ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <TextField name="tableNameTextField" hintText="テーブル名を入力してください" />
          </div>
          <div>
            <RaisedButton label="テーブル作成" labelPosition="before" containerElement="label">
              <input type="submit" style={styles.submitInput} />
            </RaisedButton>
          </div>
        </div>
      </form>
    )
  }
}

export default CreateTableForm;
