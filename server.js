// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const journalRoutes = require("./routes/journal");

dotenv.config();

const app = express();

// CORS: chỉ cho phép domain frontend chính của bạn
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://growdaily-client-73s3.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Log request để debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, req.body);
  next();
});

// Kết nối MongoDB
if (!process.env.MONGODB_URI) {
  console.error("❌ Chưa cấu hình MONGODB_URI trong biến môi trường");
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// Route kiểm tra server
app.get("/", (req, res) => {
  res.json({ message: "GrowDaily backend đang hoạt động!" });
});

// Mount router bài viết
app.use("/api/posts", journalRoutes);   // Chuẩn REST
app.use("/journal", journalRoutes);     // Vá tạm (để các request cũ /journal vẫn chạy)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});