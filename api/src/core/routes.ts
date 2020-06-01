import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";

import { RoomCtrl } from "../controllers/index";
import UserCtrl from "../controllers/UserController";

const createRoutes = (app: express.Express, io: socket.Server) => {
  const RoomController = new RoomCtrl(io);
  const UserController = new UserCtrl();

  app.use(bodyParser.json());

  app.get('/api/rooms/:id', RoomController.index);
  app.get('/api/room-list', RoomController.getAllRoomIds);
  app.post('/api/rooms', RoomController.create);

  app.post('/api/login', UserController.login);
  app.post('/api/registration', UserController.register);
  app.post('/api/verify', UserController.verify);
};

export default createRoutes;
