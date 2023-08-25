/* -------------------------------- */
/* Post Model Documentation */
/* -------------------------------- */
/* The provided code defines a mongoose schema and model for the "Post" entity. The schema includes fields such as title, content, image, author, createdAt, and updatedAt. The "Post" model represents posts in a system and can be used to store and retrieve post data. */

import mongoose from 'mongoose';

/* Create a schema */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/* Create a model */
const Post = mongoose.model('Posts', postSchema);

/* Sample post data */
// const posts = [
//   {
//     title: 'My first post',
//     content: 'This is my first post content',
//     image: 'https://res.cloudinary.com/do2j24qlb/image/upload/v1692287110/posts/image-1692287109286-254634857.jpg',
//     author: '64e201b0b4e92ff4938d083e',
//   },
//   {
//     title: 'My second post',
//     content: 'This is my second post content',
//     image: 'https://res.cloudinary.com/do2j24qlb/image/upload/v1692287110/posts/image-1692287109286-254634857.jpg',
//     author: '64e205f3b56d8a59f43ad54d',
//   },
// ];

/* Insert sample posts */
// Post.insertMany(posts);

export default Post;
