const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const journalRoutes = require("./routes/journal");

dotenv.config();

const app = express();

// ✅ Cấu hình CORS
app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://growdaily-client-783.vercel.app" // domain frontend trên Vercel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware parse JSON
app.use(express.json());

// ✅ Middleware log request để debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// ✅ Kết nối MongoDB
if (!process.env.MONGODB_URI) {
  console.error("❌ Chưa cấu hình MONGODB_URI trong biến môi trường");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});