import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../utils/generateToken.js';
import { resetPasswordEmail, sendOTP, sendVerifiedEmail } from '../utils/email.js';
import Role from '../models/roleModel.js';

const authController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ message: 'Email already registered. Please use a different email or log in.' });

      if (password.length < 6) return res.status(400).json({ message: 'Password is at least 6 characters long' });

      const passwordHash = await bcrypt.hash(password, 10);
      const role = await Role.findOne({ name: 'user' });

      const newUser = new User({
        name,
        email,
        password: passwordHash,
        role: role._id,
      });

      await newUser.save();

      await sendVerifiedEmail(email);

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Signup successfully! Please check your email to verify your account.',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      if (req.cookies.accesstoken) return res.status(400).json({ message: 'You are already logged in' });

      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate('role', 'name');
      if (!user) return res.status(400).json({ message: 'Authentication failed. Please check your credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Authentication failed. Please check your credentials' });

      const accesstoken = createAccessToken({
        id: user._id,
        name: user.name,
        emailVerified: user.emailVerified,
        role: user.role.name,
      });

      res.cookie('accesstoken', accesstoken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });

      // await sendOTP(email);

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Login successfully',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('accesstoken');

      return res.json({
        status: 'success',
        status_code: 200,
        message: 'Logged out',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  verifiedEmail: async (req, res) => {
    try {
      const token = req.params.token;
      if (!token)
        return res
          .status(400)
          .json({ message: 'The provided token is invalid. Please ensure you have the correct token' });

      const findToken = await Token.findOne({ token });
      if (!findToken)
        return res
          .status(400)
          .json({ message: 'The provided token is invalid. Please ensure you have the correct token' });

      await User.findOneAndUpdate({ email: findToken.email }, { emailVerified: true, updatedAt: Date.now() });
      await Token.findOneAndDelete({ token });

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Verified email successfully',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password } = req.body;
      const user = await User.findById(req.user.userId);

      if (!user) return res.status(400).json({ message: 'User does not exist' });

      if (password.length < 6) return res.status(400).json({ message: 'Password is at least 6 characters long' });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate({ _id: req.user.userId }, { password: passwordHash, updatedAt: Date.now() });

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Change password successfully',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User with this email does not exist' });

      await resetPasswordEmail(email);

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Check your email to reset your password',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const token = req.params.token;
      if (!token)
        return res
          .status(400)
          .json({ message: 'The provided token is invalid. Please ensure you have the correct token' });

      const findToken = await Token.findOne({ token });
      if (!findToken)
        return res
          .status(400)
          .json({ message: 'The provided token is invalid. Please ensure you have the correct token' });

      const { password } = req.body;
      const email = req.user.email;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: 'User does not exist' });

      if (password.length < 6) return res.status(400).json({ message: 'Password is at least 6 characters long' });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);

      await User.findOneAndUpdate({ email }, { password: passwordHash, updatedAt: Date.now() });
      await Token.findOneAndDelete({ token });

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Reset password successfully',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default authController;
