// functions/index.js
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();

// ✅ 获取书籍数量
exports.getBookCount = onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const db = getFirestore();
    const snap = await db.collection('books').count().get();
    const count = snap.data().count || 0;
    res.status(200).json({ count });
  } catch (err) {
    console.error('Error getting book count:', err);
    res.status(500).json({ error: 'Failed to get book count' });
  }
});

// ✅ 新增：获取所有书籍（JSON）
exports.getAllBooks = onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*'); // 允许跨域
  try {
    const db = getFirestore();
    const snap = await db.collection('books').get();
    const books = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ books });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});
