const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');

// 📌 Lấy tất cả bài viết
router.get('/', async (req, res) => {
  try {
    const posts = await Journal.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("❌ Lỗi khi lấy bài viết:", error);
    res.status(500).json({ message: "Lỗi server khi lấy bài viết" });
  }
});

// 📌 Thêm bài viết mới
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Thiếu tiêu đề hoặc nội dung" });
    }

    const newPost = new Journal({ title, content });
    await newPost.save();

    res.status(201).json({ message: "Bài viết đã được lưu thành công", post: newPost });
  } catch (error) {
    console.error("❌ Lỗi khi lưu bài viết:", error);
    res.status(500).json({ message: "Lỗi server khi lưu bài viết" });
  }
});

module.exports = router;