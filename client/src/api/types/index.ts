import { RoomId } from "~/types"

export type DataAddUserInRoom = {
  token: string;
  roomId: RoomId;
}

export type UserAuthorization = {
  email: string;
  password: string
}

export type UserRegistration = {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}
