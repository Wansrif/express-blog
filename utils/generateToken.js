/* -------------------------------------- */
/* Token Generation Functions Documentation */
/* -------------------------------------- */
/* The provided code includes two token generation functions, "createAccessToken" and "createResetPasswordToken". These functions utilize the jwt library to generate tokens based on provided user data. The tokens are used for authentication and password reset processes in the application. */

import jwt from 'jsonwebtoken';

/* Create an access token for user authentication */
export const createAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.name, emailVerified: user.emailVerified, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '2h',
    }
  );
};

/* Create a token for resetting user passwords */
export const createResetPasswordToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: '30m',
  });
};
