const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const journalRoutes = require("./routes/journal");

dotenv.config();

const app = express();

// ✅ Cấu hình CORS — chỉ cho phép domain frontend chính
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://growdaily-client-73s3.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware parse JSON
app.use(express.json());

// ✅ Middleware log request để debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, req.body);
  next();
});

// ✅ Kết nối MongoDB
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://hoangminhquy032003_db_user:06032003Quy@cluster0.55a9wdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!mongoURI.startsWith("mongodb://") && !mongoURI.startsWith("mongodb+srv://")) {
  console.error("❌ MONGODB_URI không hợp lệ. Phải bắt đầu bằng mongodb:// hoặc mongodb+srv://");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("✅ Đã kết nối MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Lỗi MongoDB:", err);
});

// ✅ Route kiểm tra server
app.get("/", (req, res) => {
  res.json({ message: "GrowDaily backend đang hoạt động!" });
});

// ✅ Gắn router bài viết
app.use("/api/posts", journalRoutes);   // Chuẩn REST
app.use("/journal", journalRoutes);     // Vá tạm cho các request cũ

// ✅ Xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error("❌ Lỗi không bắt được:", err);
  res.status(500).json({ message: "Lỗi server", error: err.message });
});

// ✅ Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});