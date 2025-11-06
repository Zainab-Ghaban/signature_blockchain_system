// 1. تحميل المكتبات الأساسية
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 2. إنشاء التطبيق
const app = express();
const PORT = process.env.PORT || 5000;

// 3. إعداد الوسائط
app.use(cors());
app.use(express.json());

// 4. مسار تجريبي للتأكد أن السيرفر شغّال
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});

// 5. تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});