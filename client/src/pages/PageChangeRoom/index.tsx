import React, { FC, useReducer, useEffect } from 'react';

import JoinBlock from '../../components/JoinBlock';
import Chat from '../../components/Room';
import reducer from '../../reducer';
import api from '../../api';
import socket from '../../socket';

import {
  FunctionOnLogin,
  PayloadSetUsers,
  FunctionAddMessage
} from '~/types';
import useUserInfo from '~/hooks/useUserInfo';

const PageChangeRoom: FC = () => {
  const userInfo = useUserInfo();

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: '',
    userName: String(userInfo.userName),
    users: [],
    messages: []
  });

  const onLogin: FunctionOnLogin = async (roomId) => {
    dispatch({
      type: 'JOINED',
      payload: {
        roomId,
        userName: state.userName
      },
    });

    socket.emit('ROOM:JOIN', {
      roomId,
      userName: state.userName
    });

    const {data} = await api.getRoom(roomId);

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
