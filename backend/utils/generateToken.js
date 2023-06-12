import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true, // prevent cross-site scripting attack
    secure: process.env.NODE_ENV === 'production', // https only
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'strict', // csrf protection
  });
};

export default generateToken;
