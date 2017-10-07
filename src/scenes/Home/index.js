import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import wallpaperImage from './wallpaper_001.jpg';

const clearAllData = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location = '/';
}

const homeStyle = {
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

const Home = ({ nickname }) => (
  <div>
    <img src={wallpaperImage} style={{ position: 'fixed', height: '100vh', filter: 'blur(2px)' }} />
    <div style={homeStyle}>
      <div style={{ margin: '5vh' }}>
        <Link to="/newTable">
          <RaisedButton label="new table" primary={true} />
        </Link>
      </div>
      <div style={{ margin: '5vh' }}>
        <Link to="/tables">
          <RaisedButton label="Table list" primary={true} />
        </Link>
      </div>
      <div style={{ margin: '5vh' }}>
        <RaisedButton label="Log out" onTouchTap={clearAllData} primary={true} />
      </div>
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
