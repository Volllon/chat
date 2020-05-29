import React, { useContext } from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import RoleContext from '../../context/RoleContext';

function PrivateRoute ({ component: Component, ...rest }: any) {
  let renderedComponent = null;
  const role = useContext(RoleContext);
  let isLoggedIn: boolean | null = null;

  if (role !== null) {
    isLoggedIn = role === 'unlogged' ? false : true;
  }

  if (isLoggedIn !== null) {
    const renderFunction = (props: any) => {
      return isLoggedIn
        ? <Component { ...props } />
        : <Redirect to="/authorization" />
    }

    renderedComponent = <Route { ...rest } render={ renderFunction } />;
  }

  return renderedComponent;
};

export default PrivateRoute;
