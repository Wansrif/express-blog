/* ---------------------------- */
/* User Schema Documentation */
/* ---------------------------- */
/* The provided code defines a mongoose schema for the "User" model. This schema represents user data and includes fields such as name, email, password, role, emailVerified, createdAt, and updatedAt. The model appears to be related to user management, likely for an authentication and authorization system. */

import mongoose from 'mongoose';

/* Create a schema */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/* Create a model */
const User = mongoose.model('Users', userSchema);

export default User;
