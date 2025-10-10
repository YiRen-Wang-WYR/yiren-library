// TS 写法；JS 把 import 改成 require 即可
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp()

export const getBookCount = onRequest(async (req, res) => {
  // 可选：允许跨域
  res.set('Access-Control-Allow-Origin', '*')

  const db = getFirestore()
  // 如果你在 Firestore 已开启 count 聚合（Node Admin SDK v11+）
  const snap = await db.collection('books').count().get()
  const count = snap.data().count || 0

  res.json({ count })
})
