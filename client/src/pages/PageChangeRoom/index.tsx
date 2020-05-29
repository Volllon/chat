import React, { FC, useReducer, useEffect } from 'react';

import JoinBlock from '../../components/JoinBlock';
import Chat from '../../components/Chat';
import reducer from '../../reducer';
import api from '../../api';
import socket from '../../socket';

import {
  FunctionOnLogin,
  PayloadSetUsers,
  FunctionAddMessage
} from '~/types';

const PageChangeRoom: FC = () => {
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
      <div className="row justify-content-center">
        <div className="wrapper">
          {
            !state.joined
              ? <JoinBlock onLogin={onLogin}/>
              : <Chat onAddMessage={addMessage} {...state} />
          }
        </div>
      </div>
    );
}

export default PageChangeRoom;
