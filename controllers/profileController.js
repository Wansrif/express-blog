/* ------------------------------------- */
/* Profile Controller Documentation */
/* ------------------------------------- */
/* The provided code defines a "profileController" object with a method for retrieving user profile data. The controller retrieves the user's profile data from the "User" model and sends a response with the retrieved information. */

import User from '../models/userModel.js';

const profileController = {
  index: async (req, res) => {
    try {
      // Find the user by their userId, excluding the password field, and populate the 'role' field with 'name'
      const user = await User.findById(req.user.userId).select('-password').populate('role', 'name');

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Get profile successfully',
        data: user,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default profileController;
