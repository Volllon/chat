import React, { FC, useEffect, useState } from 'react';
import { UserName, Message } from '~/types';
import { useParams } from 'react-router-dom';
import socket from '~/socket';

const Room: FC = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState<UserName[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageValue, setMessageValue] = useState('');

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    });

    onAddMessage({userName, text: messageValue});
    setMessageValue('');
  }

  return null;
}

export default Room;
