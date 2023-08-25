import profileController from '../../controllers/profileController';
import User from '../../models/userModel';

describe('profileController', () => {
  describe('index', () => {
    it('should return the user profile data', async () => {
      // Arrange
      const userId = '123';
      const user = {
        _id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: {
          _id: '456',
          name: 'user',
        },
      };
      const req = {
        user: {
          userId,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const populateMock = jest.fn().mockResolvedValue(user);
      const selectMock = jest.fn().mockReturnValue({ populate: populateMock });
      const findByIdMock = jest.fn().mockReturnValue({ select: selectMock });

      User.findById = findByIdMock;

      // Act
      await profileController.index(req, res);

      // Assert
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(User.findById).toHaveBeenCalledTimes(1);
      expect(selectMock).toHaveBeenCalledWith('-password');
      expect(populateMock).toHaveBeenCalledWith('role', 'name');
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        status_code: 200,
        message: 'Get profile successfully',
        data: user,
      });
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return a 500 status code if an error occurs', async () => {
      // Arrange
      const req = {
        user: {
          userId: '123',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findById = jest
        .fn()
        .mockResolvedValue(new Error('_userModel.default.findById(...).select is not a function'));

      // Act
      await profileController.index(req, res);

      // Assert
      expect(User.findById).toHaveBeenCalledWith(req.user.userId);
      expect(User.findById).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ message: '_userModel.default.findById(...).select is not a function' });
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
