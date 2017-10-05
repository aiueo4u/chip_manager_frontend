import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const clearAllData = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location = '/';
}

const Home = ({ nickname }) => (
  <div>
    <div>
      <Link to="/newTable">
        <RaisedButton label="Create new table" />
      </Link>
    </div>
    <div>
      <RaisedButton label="Log out" onTouchTap={clearAllData} />
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
