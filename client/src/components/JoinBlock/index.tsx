import React, {FC, useState} from 'react';

import api from '../../api';

import { RoomName } from '~/types';
import getToken from '~/scripts/localStorage/getToken';
import { useHistory } from 'react-router-dom';

const JoinBlock: FC = () => {
  const history = useHistory();
  const [roomName, setRoomName] = useState<RoomName>('');
  const [isLoading, setLoading] = useState(false);

  const onEnter = async () => {
    const newRoomName = roomName.trim();

    if (!newRoomName) {
      return alert('Wrong data');
    }

    const token = getToken();

    if (token) {
      setLoading(true);
      const response = await api.addRoom(newRoomName, token);

      if (response?.data) {
        history.push(`/room/${response.data.id}`);
        history.go(0);
      }
    }
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
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
