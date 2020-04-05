import React from 'react';
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Loading from 'components/Loading'
import PrivateRoute from './components/PrivateRoute';
import Home from './scenes/Home/index.js';
import Login from './scenes/Login';
import Lobby from './scenes/Lobby';
import TableList from './scenes/Tables/components/TableList';
import Room from './scenes/Tables/components/Room';

function App() {
  const { isReady } = useSelector(state => state.data.playerSession)

  if (!isReady) return <Loading />

  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/newTable" component={Lobby} />
        <PrivateRoute exact path="/tables" component={TableList} />
        <PrivateRoute exact path="/tables/:id" component={Room} />
      </div>
    </Router>
  )
}

export default App
