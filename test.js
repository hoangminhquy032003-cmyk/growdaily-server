const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/posts', (req, res) => {
  console.log('✅ Nhận request:', req.body);
  res.json({ message: 'OK' });
});

app.listen(3001, () => {
  console.log('🚀 Test server chạy tại http://localhost:3001');
});