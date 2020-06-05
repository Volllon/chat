import socket from 'socket.io';
import jwt from 'jsonwebtoken';
import {JWT} from '../configs/env';
import http from 'http';
import RoomsModel, {IRooms} from "../models/Rooms";
import User from '../models/User';

export default (http: http.Server) => {
  const io = socket(http);

  io.on('connection', function (socket) {
    socket.on('ROOM:JOIN', async ({roomId, token}: { roomId: string, token: string }) => {
      socket.join(roomId);

      const decoded = await jwt.verify(token, String(JWT));
      const user = await User.findOne({
        email: decoded.email
      });

      if (user) {
        const room = await RoomsModel.findOne({
          _id: roomId
        });
  
        let users: string[] = [];
  
        if (room) {
          const userName = user.firstName + ' ' + user.lastName;
          const sortSocketUser = [...room.users, {id: socket.id, userName}].filter(item => !!item.id);
          const updated: object = {users: sortSocketUser};

          try {
            await RoomsModel.findOneAndUpdate(
              {
                _id: roomId
              },
              {
                $set: updated
              },
              {new: true},
              (err, doc: IRooms | null) => {
                if (err || !doc) {
                  socket.to(roomId).broadcast.emit('error', err);
                } else {
                  users = doc.users.map(item => item.userName)
                }
              });
          } catch (e) {
            socket.to(roomId).broadcast.emit('error', e);
          }
        }
        // console.log(6, room?.roomId, users)
        socket.to(roomId).broadcast.emit('ROOM:USER_LIST:UPDATE', users);
      }
    });

    socket.on('ROOM:MESSAGE:ADD', async ({roomId, token, text}: { roomId: string, token: string, text: string }) => {
      const decoded = await jwt.verify(token, String(JWT));
      const user = await User.findOne({
        email: decoded.email
      });

      if (user) {
        const room = await RoomsModel.findOne({
          _id: roomId
        });

        if (room) {
          const message = {
            text,
            userName: user.firstName + ' ' + user.lastName
          };
          const sortSocketMessages = [message, ...room.messages.reverse()].slice(0, 20).reverse();
          const updated: object = {
            messages: sortSocketMessages
          };

          try {
            await RoomsModel.findOneAndUpdate(
              {
                _id: roomId
              },
              {
                $set: updated
              },
              {new: true},
              (err, doc: IRooms | null) => {
                if (err || !doc) {
                  socket.to(roomId).broadcast.emit('error', err);
                } else {
                  io.in(roomId).emit('ROOM:MESSAGE:ADD', message);
                }
              });
          } catch (e) {
            socket.to(roomId).broadcast.emit('error', e);
          }
        }
      }
    });

    socket.on('disconnect', async () => {
      let users: string[] = [];
      const candidate = await RoomsModel.findOne({'users.id': socket.id})

      if (candidate) {
        const sortSocketUser = candidate.users.filter(item => item.id !== socket.id)
        let updated: object = {users: sortSocketUser}

        try {
          await RoomsModel.findOneAndUpdate(
            {'users.id': socket.id},
            {
              $set: updated
            },
            {new: true},
            (err, doc: IRooms | null) => {
              if (err || !doc) {
                socket.to(candidate.roomId).broadcast.emit('error', err);
              } else {
                users = doc.users.map(item => item.userName)
              }
            });
        } catch (e) {
          socket.to(candidate.roomId).broadcast.emit('error', e);
        }
        console.log('USER DISCONNECTED', socket.id);
        socket.to(candidate.roomId).broadcast.emit('ROOM:USER_LIST:UPDATE', users);
      }
    });

    console.log('user connected', socket.id);
  });

  return io;
};
