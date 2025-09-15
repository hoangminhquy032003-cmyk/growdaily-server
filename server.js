const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const journalRoutes = require("./routes/journal");

dotenv.config();

const app = express();

// ✅ Cấu hình CORS cho cả local và domain deploy
app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://growdaily-client.onrender.com" // domain deploy
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware để parse JSON
app.use(express.json());

// ✅ Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// ✅ Route kiểm tra server
app.get("/", (req, res) => {
  res.json({ message: "GrowDaily backend đang hoạt động!" });
});

// ✅ Gắn router bài viết
app.use("/api/posts", journalRoutes);

// ✅ Khởi động server
const PORT = process.env.PORT || 3001; // đổi về 3001 để khớp với local
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});