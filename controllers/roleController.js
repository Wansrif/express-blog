/* ----------------------------- */
/* Role Controller Documentation */
/* ----------------------------- */
/* The provided code defines a roleController object with various methods for handling CRUD (Create, Read, Update, Delete) operations for a "Role" model. The Role model appears to be related to some form of application or system that manages roles, possibly for user permissions or access control. */

import Role from '../models/roleModel.js';

const roleController = {
  /* Method: index
   * HTTP Method: GET
   * Endpoint: /
   * Description: Retrieve a list of all roles.
   * Response:
   * - status: Status of the response (string)
   * - status_code: HTTP status code (integer)
   * - message: A message indicating the operation's outcome (string)
   * - result: Number of roles in the response (integer)
   * - data: An array of role objects (array)
   */
  index: async (req, res) => {
    try {
      const roles = await Role.find();

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Get all roles',
        result: roles.length,
        data: roles,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  /* Method: store
   * HTTP Method: POST
   * Endpoint: /
   * Description: Create a new role.
   * Request Body:
   * - name: Name of the new role (string)
   * Response:
   * - status: Status of the response (string)
   * - status_code: HTTP status code (integer)
   * - message: A message indicating the operation's outcome (string)
   * - data: The newly created role object (object)
   */
  store: async (req, res) => {
    try {
      const { name } = req.body;
      const findRole = await Role.findOne({ name });

      const errors = [];

      if (!name) {
        errors.push({ name: 'The name field is required.' });
      }

      if (findRole) {
        errors.push({ name: 'The name field already exists.' });
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const role = new Role({
        name,
      });

      await role.save();

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Create role successfully',
        data: role,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  /* Method: update
   * HTTP Method: PUT
   * Endpoint: /:id
   * Description: Update an existing role.
   * Request Parameters:
   * - id: Role ID (string)
   * Request Body:
   * - name: New name for the role (string)
   * Response:
   * - status: Status of the response (string)
   * - status_code: HTTP status code (integer)
   * - message: A message indicating the operation's outcome (string)
   * - data: The updated role object (object)
   */
  update: async (req, res) => {
    try {
      const { name } = req.body;
      const findRole = await Role.findOne({ name });

      const errors = [];

      if (!name) {
        errors.push({ name: 'The name field is required.' });
      }

      if (findRole) {
        errors.push({ name: 'The name field already exists.' });
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const role = await Role.findById(req.params.id);

      if (!role) return res.status(404).json({ message: 'Role not found' });

      role.name = name;

      await role.save();

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Update role successfully',
        data: role,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  /* Method: destroy
   * HTTP Method: DELETE
   * Endpoint: /:id
   * Description: Delete a role.
   * Request Parameters:
   * - id: Role ID (string)
   * Response:
   * - status: Status of the response (string)
   * - status_code: HTTP status code (integer)
   * - message: A message indicating the operation's outcome (string)
   */
  destroy: async (req, res) => {
    try {
      const role = await Role.findById(req.params.id);

      if (!role) return res.status(404).json({ message: 'Role not found' });

      await role.deleteOne();

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Delete role successfully',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default roleController;
