import Post from '../models/postModel.js';
import cloudinary from '../utils/cloudinary.js';

const postController = {
  index: async (req, res) => {
    try {
      const isAdmin = req.user.role === 'admin';
      const posts = isAdmin
        ? await Post.find().populate('author', 'name')
        : await Post.find({ author: req.user.userId }).populate('author', 'name');

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Get all posts',
        result: posts.length,
        data: posts,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  store: async (req, res) => {
    try {
      const { title, content } = req.body;
      const imageFile = req.files?.image;

      const errors = [];

      if (!title) {
        errors.push({ title: 'The title field is required.' });
      }
      if (!content) {
        errors.push({ content: 'The content field is required.' });
      }
      if (!imageFile) {
        errors.push({ image: 'The image field is required.' });
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const uploadedImage = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: 'posts',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: `image-${Date.now() + '-' + Math.round(Math.random() * 1e9)}`,
      });

      const user = req.user.userId;

      const post = new Post({
        title,
        content,
        author: user,
        image: uploadedImage.secure_url,
        image_id: uploadedImage.public_id,
      });

      await post.save();

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Create post successfully',
        data: post,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  show: async (req, res) => {
    try {
      const isAdmin = req.user.role === 'admin';
      const post = isAdmin
        ? await Post.findById(req.params.id).populate('author', 'name')
        : await Post.findOne({ _id: req.params.id, author: req.user.userId }).populate('author', 'name');

      if (!post) return res.status(404).json({ message: 'Post not found' });

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Successfully get post',
        data: post,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { title, content } = req.body;
      const imageFile = req.files?.image;

      const errors = [];

      if (!title) {
        errors.push({ title: 'The title field is required.' });
      }
      if (!content) {
        errors.push({ content: 'The content field is required.' });
      }
      if (!imageFile) {
        errors.push({ image: 'The image field is required.' });
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const admin = req.user.role === 'admin';
      const post = admin
        ? await Post.findById(req.params.id)
        : await Post.findOne({ _id: req.params.id, author: req.user.userId });

      if (!post) return res.status(404).json({ message: 'Post not found' });

      const uploadedImage = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: 'posts',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: `image-${Date.now() + '-' + Math.round(Math.random() * 1e9)}`,
      });

      await cloudinary.uploader.destroy(post.image_id);

      post.title = title;
      post.content = content;
      post.image = uploadedImage.secure_url;
      post.image_id = uploadedImage.public_id;

      await post.save();

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Update post successfully',
        data: post,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  destroy: async (req, res) => {
    try {
      const isAdmin = req.user.role === 'admin';
      const post = isAdmin
        ? await Post.findById(req.params.id)
        : await Post.findOne({ _id: req.params.id, author: req.user.userId });

      if (!post) return res.status(404).json({ message: 'Post not found' });

      await cloudinary.uploader.destroy(post.image_id);

      await post.deleteOne();

      res.json({
        status: 'success',
        status_code: 200,
        message: 'Delete post successfully',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default postController;
