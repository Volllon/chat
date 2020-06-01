import controller from './controller';
import {
  UserRegistration,
  UserAuthorization,
  DataAddUserInRoom
} from './types';
import { RoomId } from '../types';

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
  getRoom(roomId: RoomId) {
    return controller.get(`api/rooms/${roomId}`)
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
  addUserInRoom(data: DataAddUserInRoom) {
    return controller.post('api/rooms', data)
      .then((response) => {
        return response;
      });
  }
};

export default api;
