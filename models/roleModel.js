/* -------------------------------- */
/* Role Model Documentation */
/* -------------------------------- */
/* The provided code defines a mongoose schema and model for the "Role" entity. The schema includes a "name" field for the role's name and "createdAt" and "updatedAt" fields for tracking creation and update times. The "Role" model represents roles within a system and can be used to store and retrieve role data. */

import mongoose from 'mongoose';

/* Create a schema */
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/* Create a model */
const Role = mongoose.model('Roles', roleSchema);

export default Role;
