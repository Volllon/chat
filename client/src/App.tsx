import React, { FC, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Context from './context';
import PageRegistration from './pages/PageRegistration';
import PageAuthorization from './pages/PageAuthorization';
import PageChangeRoom from './pages/PageChangeRoom';
import PageRoomList from './pages/PageRoomList';
import PrivateRoute from './components/PrivateRoute';

import { Role, UserName } from './types';

import './index.css';
import getUserInfo from './scripts/getUserInfo';
import Room from './components/Room';

const App: FC = () => {
  const [userName, setUserName] = useState<UserName | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    getUserInfo().then((data) => {
      if (data) {
        setUserName(data.userName);
        setRole(data.role);
      }
    });
  }, []);

  return (
    <Router>
      <Context.Provider value={ { userName, role } }>
        <div className="container">
          <Switch>
            <PrivateRoute
              path="/rooms"
              component={ PageRoomList }
              exact
            />
            <PrivateRoute
              path="/room/:roomId"
              component={ Room }
              exact
            />
            <Route path="/authorization" exact>
              <PageAuthorization />
            </Route>
            <Route path="/registration" exact>
              <PageRegistration />
            </Route>
          </Switch>
        </div>
      </Context.Provider>
    </Router>
  );
}

export default App;
