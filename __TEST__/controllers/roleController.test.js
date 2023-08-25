import Role from '../../models/roleModel.js';
import roleController from '../../controllers/roleController.js';

describe('Role Controller', () => {
  describe('index method', () => {
    it('should return a list of all roles', async () => {
      const roles = [{ name: 'admin' }, { name: 'user' }, { name: 'guest' }];
      jest.spyOn(Role, 'find').mockResolvedValue(roles);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await roleController.index(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        status_code: 200,
        message: 'Get all roles',
        result: roles.length,
        data: roles,
      });
    });

    it('should return a 500 error if an error occurs', async () => {
      jest.spyOn(Role, 'find').mockRejectedValue(new Error('Database error'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await roleController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  describe('store method', () => {
    it('should create a new role', async () => {
      const req = {
        body: { name: 'admin' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      jest.spyOn(Role, 'findOne').mockResolvedValue(null);
      jest.spyOn(Role.prototype, 'save').mockResolvedValue(new Role({ name: 'admin' }));

      await roleController.store(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        status_code: 200,
        message: 'Create role successfully',
        data: expect.objectContaining({ name: 'admin' }),
      });
    });

    it('should return a 400 error if the name field is missing', async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await roleController.store(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: [{ name: 'The name field is required.' }],
      });
    });

    it('should return a 400 error if the name field already exists', async () => {
      const req = {
        body: { name: 'admin' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(Role, 'findOne').mockResolvedValue({ name: 'admin' });

      await roleController.store(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: [{ name: 'The name field already exists.' }],
      });
    });

    it('should return a 500 error if an error occurs', async () => {
      const req = {
        body: { name: 'admin' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Role.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

      await roleController.store(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('update method', () => {
    it('should update an existing role', async () => {
      const req = {
        params: { id: '123' },
        body: { name: 'admin' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      jest.spyOn(Role, 'findOne').mockResolvedValue(null);
      jest.spyOn(Role, 'findById').mockResolvedValue({ name: 'user', save: jest.fn() });

      await roleController.update(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        status_code: 200,
        message: 'Update role successfully',
        data: expect.objectContaining({ name: 'admin' }),
      });
    });

    it('should return a 500 error if an error occurs', async () => {
      const req = {
        params: { id: '123' },
        body: { name: 'admin' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Role.findById = jest.fn().mockRejectedValue(new Error('Database error'));

      await roleController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

    it('should return a 404 error if the role is not found', async () => {
      const req = {
        params: { id: '123' },
        body: { name: 'admin' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(Role, 'findById').mockResolvedValue(null);

      await roleController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Role not found' });
    });

    it('should return a 400 error if the name field is missing', async () => {
      const req = {
        params: { id: '123' },
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await roleController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: [{ name: 'The name field is required.' }],
      });
    });

    it('should return a 400 error if the name field already exists', async () => {
      const req = {
        params: { id: '123' },
        body: { name: 'admin' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(Role, 'findOne').mockResolvedValue({ name: 'admin' });

      await roleController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: [{ name: 'The name field already exists.' }],
      });
    });
  });

  describe('destroy method', () => {
    it('should delete a role', async () => {
      const req = {
        params: { id: '123' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      jest.spyOn(Role, 'findById').mockResolvedValue({ deleteOne: jest.fn() });

      await roleController.destroy(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        status_code: 200,
        message: 'Delete role successfully',
      });
    });

    it('should return a 404 error if the role is not found', async () => {
      const req = {
        params: { id: '123' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(Role, 'findById').mockResolvedValue(null);

      await roleController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Role not found' });
    });

    it('should return a 500 error if an error occurs', async () => {
      const req = {
        params: { id: '123' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Role.findById = jest.fn().mockRejectedValue(new Error('Database error'));

      await roleController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});
