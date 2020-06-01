import React, {FC, useState} from 'react';

import api from '../../api';

import {
  RoomId,
  UserName,
  FunctionOnLogin
} from '~/types';
import getToken from '~/scripts/localStorage/getToken';
import useUserInfo from '~/hooks/useUserInfo';

type Props = {
  onLogin: FunctionOnLogin;
}

const JoinBlock: FC<Props> = ({onLogin}) => {
  const [roomId, setRoomId] = useState<RoomId>('');
  const [isLoading, setLoading] = useState(false);

  const onEnter = async () => {
    if (!roomId) {
      return alert('Wrong data');
    }

    const token = getToken();

    if (token) {
      setLoading(true);
      await api.addUserInRoom({ roomId, token });
      onLogin(roomId);
    }
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        className="btn btn-success"
        disabled={isLoading}
        onClick={onEnter}
      >
        {isLoading ? 'Entry...' : 'Join'}
      </button>
    </div>
  );
}

export default JoinBlock;
