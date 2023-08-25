import express from 'express';

const documentationRouter = express.Router();

documentationRouter.get('/', (req, res) => {
  const documentation = {
    auth: {
      '/api/auth/signup': {
        method: 'POST',
        cookies: 'None',
        description: 'Create a new user',
        body: {
          name: 'String',
          email: 'String',
          password: 'String',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
      '/api/auth/login': {
        method: 'POST',
        cookies: 'None',
        description: 'Login a user',
        body: {
          email: 'String',
          password: 'String',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
      '/api/auth/logout': {
        method: 'POST',
        cookies: 'accesstoken',
        description: 'Logout a user',
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
      '/api/auth/verified-email/:token': {
        method: 'POST',
        cookies: 'None',
        description: "Verify a user's email address",
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
      '/api/auth/change-password': {
        method: 'POST',
        cookies: 'accesstoken',
        description: "Change a user's password",
        body: {
          oldPassword: 'String',
          newPassword: 'String',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
      '/api/auth/forgot-password': {
        method: 'POST',
        cookies: 'None',
        description: 'Send a password reset email to a user',
        body: {
          email: 'String',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
      '/api/auth/reset-password/:token': {
        method: 'POST',
        cookies: 'None',
        description: "Reset a user's password",
        body: {
          newPassword: 'String',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
    },
    posts: {
      '/api/posts': {
        method: 'GET',
        cookies: 'None',
        description: 'Get all posts',
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          posts: [
            {
              _id: 'String',
              title: 'String',
              content: 'String',
              image: 'String',
              author: 'String',
              createdAt: 'Date',
              updatedAt: 'Date',
              __v: 'Number',
            },
          ],
        },
      },
      '/api/posts/:id': {
        method: 'GET',
        cookies: 'None',
        description: 'Get a post by id',
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          post: {
            _id: 'String',
            title: 'String',
            content: 'String',
            image: 'String',
            author: 'String',
            createdAt: 'Date',
            updatedAt: 'Date',
            __v: 'Number',
          },
        },
      },
      '/api/posts': {
        method: 'POST',
        cookies: 'accesstoken',
        description: 'Create a new post',
        body: {
          title: 'String',
          content: 'String',
          image: 'File',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          post: {
            _id: 'String',
            title: 'String',
            content: 'String',
            image: 'String',
          },
        },
      },
      '/api/posts/:id': {
        method: 'PUT',
        cookies: 'accesstoken',
        description: 'Update a post',
        body: {
          title: 'String',
          content: 'String',
          image: 'File',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          post: {
            _id: 'String',
            title: 'String',
            content: 'String',
            image: 'String',
          },
        },
      },
      '/api/posts/:id': {
        method: 'DELETE',
        cookies: 'accesstoken',
        description: 'Delete a post',
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
    },
    profile: {
      '/api/profile': {
        method: 'GET',
        cookies: 'accesstoken',
        description: "Get a user's profile",
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          profile: {
            _id: 'String',
            name: 'String',
            email: 'String',
            role: 'String',
            emailVerified: 'Boolean',
            createdAt: 'Date',
            updatedAt: 'Date',
            __v: 'Number',
          },
        },
      },
    },
    role: {
      '/api/role': {
        method: 'GET',
        cookies: 'accesstoken',
        description: "Get a user's role",
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          role: {
            _id: 'String',
            name: 'String',
            createdAt: 'Date',
            updatedAt: 'Date',
            __v: 'Number',
          },
        },
      },
      '/api/role': {
        method: 'POST',
        cookies: 'accesstoken',
        description: 'Create a new role',
        body: {
          name: 'String',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          role: {
            _id: 'String',
            name: 'String',
            createdAt: 'Date',
            updatedAt: 'Date',
            __v: 'Number',
          },
        },
      },
      '/api/role/:id': {
        method: 'PUT',
        cookies: 'accesstoken',
        description: 'Update a role',
        body: {
          name: 'String',
        },
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
          role: {
            _id: 'String',
            name: 'String',
            createdAt: 'Date',
            updatedAt: 'Date',
            __v: 'Number',
          },
        },
      },
      '/api/role/:id': {
        method: 'DELETE',
        cookies: 'accesstoken',
        description: 'Delete a role',
        body: 'None',
        response: {
          status: 'String',
          status_code: 'Number',
          message: 'String',
        },
      },
    },
  };

  res.json({
    status: 'success',
    status_code: 200,
    message: 'Get documentation successfully',
    documentation,
  });
});

export default documentationRouter;
