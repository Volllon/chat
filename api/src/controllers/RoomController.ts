import express from 'express';
import socket from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT } from '../configs/env';
import User from '../models/User';
import RoomsModel, { IRooms } from '../models/Rooms';

class RoomController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (req: express.Request, res: express.Response) => {

    const { id } = req.params;
    const { token } = req.query;

    const decoded = await jwt.verify(token, String(JWT));
    const user = await User.findOne({
      email: decoded.email
    });

    if (user) {
      const room = await RoomsModel.findOne({
        _id: String(id)
      });
  
      if (room) {
        console.log(room)
        res.json({
          roomName: room.roomId,
          users: room.users.map(item => item.userName),
          messages: room.messages,
        });
      } else {
        res.json({
          roomName: '',
          users: [],
          messages: [],
        });
      }
    }
  };

  create = async (req: express.Request, res: express.Response) => {
    const { roomName, token } = req.body;

    const decoded = await jwt.verify(token, String(JWT));
    const user = await User.findOne({
      email: decoded.email
    });

    if (user) {
      const room = await RoomsModel.findOne({
        roomId: roomName
      });
  
      if (room) {
        res.status(201).json({
          id: room._id
        });
      } else {
        const newRoom = new RoomsModel({
          roomId: roomName,
          users: [],
          messages: [],
        });
  
        try {
          await newRoom.save();
          res.status(201).json({
            id: newRoom._id
          });
        } catch (e) {
          res.status(500).json({
            massage: e
          })
        }
      }
    }
  };

  getAllRoomIds = async (req: express.Request, res: express.Response) => {
    const rooms = await RoomsModel.find();
    
    if (rooms) {
      const roomsInfo: { id: string, name: string }[] = [];

      rooms.forEach((room) => {
        roomsInfo.push({
          id: room._id,
          name: room.roomId
        });
      });

      res.json(roomsInfo);
    }
  };
}

export default RoomController;
