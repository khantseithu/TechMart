import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import asyncHandler from './asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read token from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from database
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
