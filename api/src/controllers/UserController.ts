import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import errorHandler from '../core/utils/errorHandler';
import {JWT} from '../configs/env';

class UserController {
  login = async (req: express.Request, res: express.Response) => {
    const candidate = await User.findOne({
      email: req.body.email
    });

    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

      if (passwordResult) {
        // generation token
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, String(JWT), {
          expiresIn: 60 * 60
        });
        
        res.status(201).json({ token });
      } else {
        res.status(401).json({
          message: 'User un authorize.'
        })
      }
    } else {
      // user not found, alert
      res.status(404).json({
        message: 'user not found'
      })
    }
  }

  register = async (req: express.Request, res: express.Response) => {
    const candidate = await User.findOne({
      email: req.body.email
    });

    if (candidate) {
      res.status(409).json({
        message: 'such an email is already taken'
      })
    } else {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: 0
      });

      try {
        await user.save();

        const token = jwt.sign({
          email: user.email,
          userId: user._id
        }, String(JWT), {
          expiresIn: 60 * 60
        });

        res.status(201).json({ token });
      } catch (e) {
        errorHandler(res, e)
      }
    }
  }

  verify = async (req: express.Request, res: express.Response) => {
    try {
      const decoded = await jwt.verify(req.body.token, String(JWT));
      const candidate = await User.findOne({
        email: decoded.email
      });
      if (candidate) {
        res.status(201).json({
          candidate,
        })
      } else {
        res.status(404).json({
          message: 'user not found'
        })
      }
    } catch (err) {
      res.status(401).json({
        message: 'User un authorize.'
      })
    }
  }
}

export default UserController;
