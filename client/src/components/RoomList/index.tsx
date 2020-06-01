import React, { FC, useEffect, useState } from 'react';
import api from '../../api';
import getToken from '../../scripts/localStorage/getToken';
import { RoomName } from '~/types';
import { Link } from 'react-router-dom';

type RoomInfo = {
  id: string;
  name: RoomName;
};

const RoomList: FC = () => {
  const [roomsInfo, setRoomsInfo] = useState<RoomInfo[]>([]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      api.getAllRoomIds(token).then((response) => {
        if (response.data) {
          setRoomsInfo([...response.data]);
        }
      });
    }
  }, []);

  return (
    <div>
      {roomsInfo.map((roomInfo) => {
        return (
          <div className="row justify-content-center">
            <Link
              className="btn btn-link"
              key={ roomInfo.id }
              to={ `/room/${ roomInfo.id }` }
            >
              { roomInfo.name }
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default RoomList;
