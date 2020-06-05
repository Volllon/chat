import controller from './controller';
import {
  UserRegistration,
  UserAuthorization,
  DataAddUserInRoom
} from './types';
import { RoomName, RoomId } from '../types';

const api = {
  signup(user: UserRegistration) {
    return controller.post( 'api/registration', user)
      .then((response) => {
        return response;
      });
  },
  signin(user: UserAuthorization) {
    return controller.post( 'api/login', user)
      .then((response) => {
        return response;
      });
  },
  verify(token: string) {
    return controller.post('api/verify', { token })
      .then((response) => {
        return response;
      });
  },
  getRoom(id: RoomId, token: string) {
    return controller.get(`api/room/${id}`, { params: { token } })
      .then((response) => {
        return response;
      });
  },
  getAllRoomIds(token: string) {
    return controller.get('api/room-list', { params: { token } })
      .then((response) => {
        return response;
      });
  },
  addRoom(roomName: RoomName, token: string) {
    return controller.post('api/add-room', { roomName, token })
      .then((response) => {
        return response;
      });
  }
};

export default api;
