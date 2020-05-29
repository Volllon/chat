import React, { FC, useState, useEffect } from 'react';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import RoleContext from './context/RoleContext';
import PageRegistration from './pages/PageRegistration';
import PageAuthorization from './pages/PageAuthorization';
import PageChangeRoom from './pages/PageChangeRoom';
import PrivateRoute from './components/PrivateRoute';
import getUpdatedRole from './scripts/getUpdatedRole';

import { Role } from './types';

import './index.css';

const App: FC = () => {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    getUpdatedRole().then((value) => {
      setRole(value);
    });
  }, []);

  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <RoleContext.Provider value={ role }>
        <div className="container">
          <Switch>
            <PrivateRoute
              path="/"
              history={ history }
              component={ PageChangeRoom }
              exact
            />
            <Route path="/authorization" history={ history } exact>
              <PageAuthorization />
            </Route>
            <Route path="/registration" history={ history } exact>
              <PageRegistration />
            </Route>
          </Switch>
        </div>
      </RoleContext.Provider>
    </Router>
  );
}

export default App;
