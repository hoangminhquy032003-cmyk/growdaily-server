// routes/journal.js
const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");

// Lấy tất cả bài viết
router.get("/", async (req, res) => {
  try {
    const posts = await Journal.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Lỗi khi lấy bài viết:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Thêm bài viết mới
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("Payload nhận được:", req.body);

    if (!title || !content) {
      return res.status(400).json({ message: "Thiếu tiêu đề hoặc nội dung" });
    }

    const newPost = new Journal({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Lỗi khi lưu bài viết:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;