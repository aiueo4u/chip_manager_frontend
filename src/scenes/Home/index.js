import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const Home = ({ nickname }) => (
  <div>
    <div>
      <Link to="/newTable">
        <RaisedButton label="新規テーブルを作成" />
      </Link>
    </div>
  </div>
)

export default connect(
  (state, ownProps) => {
    return {
      nickname: state.data.playerSession.nickname,
    }
  }
)(Home);
