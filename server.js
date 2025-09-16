const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const journalRoutes = require("./routes/journal");

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://growdaily-client-73s3.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, req.body);
  next();
});

if (!process.env.MONGODB_URI) {
  console.error("❌ Chưa cấu hình MONGODB_URI trong biến môi trường");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("✅ Đã kết nối MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Lỗi MongoDB:", err);
});

app.get("/", (req, res) => {
  res.json({ message: "GrowDaily backend đang hoạt động!" });
});

app.use("/api/posts", journalRoutes);
app.use("/journal", journalRoutes);

app.use((err, req, res, next) => {
  console.error("❌ Lỗi không bắt được:", err);
  res.status(500).json({ message: "Lỗi server", error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});