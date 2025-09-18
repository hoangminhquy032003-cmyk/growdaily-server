// routes/journal.js
const express = require('express');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

const router = express.Router();

// Lấy bài viết của user hiện tại
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Journal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lấy bài viết' });
  }
});

// Tạo bài viết mới
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Thiếu tiêu đề hoặc nội dung' });
    }

    const newPost = new Journal({
      title,
      content,
      userId: req.user.id
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lưu bài viết' });
  }
});

// Xoá bài viết của user hiện tại
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json({ message: 'Đã xoá bài viết' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi xoá bài viết' });
  }
});

module.exports = router;
