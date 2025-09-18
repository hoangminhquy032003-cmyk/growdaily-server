const express = require("express");
const Journal = require("../models/Journal");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Journal.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy bài viết" });
  }
});

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
    res.status(500).json({ message: "Lỗi server khi lưu bài viết" });
  }
});

module.exports = router;