// Firebase modular SDK via CDN (ES modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ⚠️ GITHUB PAGES SAFE CONFIG
// Этот API ключ используется для чтения данных, поэтому может быть публичным
// Для продакшна используйте Firebase Security Rules для защиты данных
const firebaseConfig = {
  apiKey: "AIzaSyApneyBzn708eU5WWaRaEvJyXu7SSVCEWo",
  authDomain: "busston-768d8.firebaseapp.com",  // ✅ ИСПРАВЛЕНО
  projectId: "busston-768d8",
  storageBucket: "busston-768d8.firebasestorage.app",
  messagingSenderId: "703723271340",
  appId: "1:703723271340:web:09b837ca6f085337cd5b09",
  measurementId: "G-QF5PWNV4WC"
};

let app = null;
let db = null;
let isFirebaseReady = false;
let firebaseError = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // ✅ Включаем persistence для кэширования (важно для GitHub Pages)
  // Это позволит работать offline и быстрее загружать данные
  try {
    await db.enablePersistence();
    console.log('✅ Firestore persistence включена');
  } catch (err) {
    if (err.code === 'failed-precondition') {
      console.warn('⚠️ Persistence не включена (несколько вкладок?)', err);
    } else if (err.code === 'unimplemented') {
      console.warn('⚠️ Persistence не поддерживается в этом браузере', err);
    }
  }
  
  isFirebaseReady = true;
  console.log('✅ Firebase инициализирован успешно');
} catch (err) {
  firebaseError = err;
  console.error('❌ Ошибка инициализации Firebase:', err);
}

export { app, db, isFirebaseReady, firebaseError };
