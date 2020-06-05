import React, {
  FC,
  useState,
  useRef,
  useEffect
} from 'react';

import socket from '../../socket';

import {
  UserName,
  Message,
  RoomName,
  RoomId
} from '../../types';
import api from '../../api';
import { useParams } from 'react-router-dom';
import getToken from '../../scripts/localStorage/getToken';

const Room: FC = () => {
  const { roomId } = useParams<{ roomId: RoomId}>();
  const [roomName, setRoomName] = useState<RoomName>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<UserName[]>([]);
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  const updateRoom = async () => {

    const token = getToken();

    if (token) {
      socket.emit('ROOM:JOIN', {
        roomId,
        token
      });

      const response = await api.getRoom(roomId, token);

      if (response?.data) {
        const { data } = response;

        setRoomName(data.roomName);
        setUsers(data.users);
        setMessages(data.messages);
      }
    }
  }

  const onSendMessage = () => {
    const token = getToken();

    if (token) {
      socket.emit('ROOM:MESSAGE:ADD', {
        roomId,
        token,
        text: messageValue
      });
  
      setMessageValue('');
    }
  }

  const addMessage = (message: Message) => {
    console.log(messages);
    const updatedMessages = [...messages];

    updatedMessages.push(message);
    setMessages([...updatedMessages])
  }

  useEffect(() => {
    updateRoom();
  }, []);

  useEffect(() => {
    socket.on('ROOM:USER_LIST:UPDATE', setUsers);
    socket.on('ROOM:MESSAGE:ADD', addMessage);
  }, []);

  useEffect(() => {

    messagesRef.current!.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">

      <div className="chat-users">
        Room: <b>{roomName}</b>
        <hr/>
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name: UserName, index: number) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>

      <div className="chat-messages">
        <div
          className="messages"
          ref={messagesRef}
        >
          {messages.map((message: Message, index: number) => (
            <div className="message" key={message.userName + index}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>

        <form>
          <textarea
            className="form-control"
            value={messageValue}
            rows={3}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={onSendMessage}
          >
            Send
          </button>
        </form>
      </div>

    </div>
  );
}

export default Room;
