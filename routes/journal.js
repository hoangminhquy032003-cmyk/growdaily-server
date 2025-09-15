const express = require("express");
const router = express.Router();

// Import model với đúng tên file và đúng hoa/thường
const Journal = require("../models/Journal");

// Lấy tất cả bài viết
router.get("/", async (req, res) => {
  try {
    const posts = await Journal.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Thêm bài viết mới
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Thiếu tiêu đề hoặc nội dung" });
    }
    const newPost = new Journal({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;