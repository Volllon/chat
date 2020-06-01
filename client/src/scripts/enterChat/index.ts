import { RoomId } from "~/types";
import api from "~/api";

export default async (roomId: RoomId) => {
  // dispatch({
  //   type: 'JOINED',
  //   payload: {
  //     roomId,
  //     userName: state.userName
  //   },
  // });

  socket.emit('ROOM:JOIN', { roomId, token });

  const { users, messages } = await api.getRoom(roomId);

  dispatch({
    type: 'SET_CHAT',
    payload: data,
  });
};