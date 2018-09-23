import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import WallPaperImage from 'components/WallPaperImage';

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
    <WallPaperImage />
    <div style={homeStyle}>
      <div style={{ margin: '5vh' }}>
        <Link to="/newTable">
          <Button variant="raised">
            新規テーブル作成
          </Button>
        </Link>
      </div>
      <div style={{ margin: '5vh' }}>
        <Link to="/tables">
          <Button variant="raised">
            テーブル一覧
          </Button>
        </Link>
      </div>
      <div style={{ margin: '5vh' }}>
        <Button variant="raised" onClick={clearAllData}>
          ログアウト
        </Button>
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
