import React, { Component } from 'react';

class CreateTableForm extends Component {
  render() {
    const { isFetching, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input type="submit" value="テーブル作成" />
          {isFetching ? <div>now loading...</div> : <div></div>}
        </div>
      </form>
    )
  }
}

export default CreateTableForm;
