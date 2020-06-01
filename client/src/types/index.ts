export type Joined = boolean;
export type RoomName = string;
export type UserName = string;
export type Message = {
  userName: string;
  text: string;
}

export type PayloadJoined = {
  userName: UserName;
  roomId: RoomName;
}

export type PayloadSetData = {
  users: UserName[];
  messages: Message[];
}

export type PayloadSetUsers = UserName[];

export type PayloadNewMessage = Message;

export type FunctionOnLogin = (roomName: RoomName) => void;
export type FunctionAddMessage = (message: PayloadNewMessage) => void;

export type Role = 'unlogged' | 'user' | 'admin';

declare global {
  interface Window {
    socket: SocketIOClient.Socket;
  }
}
