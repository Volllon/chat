import React, {
  FC,
  useReducer,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import socket from './socket';
import reducer from './reducer';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import api from './api';
import PageRegistration from './pages/PageRegistration';
import PageAuthorization from './pages/PageAuthorization';

import {
  PayloadSetUsers,
  FunctionOnLogin,
  FunctionAddMessage
} from './types';

import './index.css';

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: '',
    userName: '',
    users: [],
    messages: []
  });

  const onLogin: FunctionOnLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });

    socket.emit('ROOM:JOIN', obj);

    const {data} = await api.getRoom(obj.roomId);

    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users: PayloadSetUsers) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage: FunctionAddMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/authorization">
            <PageAuthorization />
          </Route>
          <Route path="/registration">
            <PageRegistration />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
// <div className="wrapper">
    //   {
    //     !state.joined
    //       ? <JoinBlock onLogin={onLogin}/>
    //       : <Chat onAddMessage={addMessage} {...state} />
    //   }
    // </div>