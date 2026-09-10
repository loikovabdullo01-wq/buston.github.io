// ⚠️ GITHUB PAGES CONFIGURATION
// Инициализация Firebase для статического хостинга
// https://github.com/firebase/firebase-js-sdk

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
  getFirestore, 
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ========== КОНФИГУРАЦИЯ FIREBASE ==========
// Этот API ключ является публичным, так как используется для чтения данных
// Безопасность обеспечивается Firebase Security Rules (смотри Firebase Console)
// https://firebase.google.com/docs/firestore/security/get-started
const firebaseConfig = {
  apiKey: "AIzaSyApneyBzn708eU5WWaRaEvJyXu7SSVCEWo",
  authDomain: "busston-768d8.firebaseapp.com",  // ✅ ИСПРАВЛЕНО: полный домен вместо ://firebaseapp.com
  projectId: "busston-768d8",
  storageBucket: "busston-768d8.firebasestorage.app",
  messagingSenderId: "703723271340",
  appId: "1:703723271340:web:09b837ca6f085337cd5b09",
  measurementId: "G-QF5PWNV4WC"
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========
let app = null;
let db = null;
let isFirebaseReady = false;
let firebaseError = null;

try {
  // Инициализируем Firebase
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // ✅ Включаем IndexedDB persistence
  // Это критично для GitHub Pages:
  // 1. Кэширует данные локально (работает offline)
  // 2. Уменьшает количество запросов к серверу
  // 3. Ускоряет загрузку страницы (холодный кэш → быстрая первая загрузка)
  // 4. Снижает нагрузку на Firestore (экономит квоту)
  enableIndexedDbPersistence(db, { cacheSizeBytes: CACHE_SIZE_UNLIMITED })
    .then(() => {
      console.log('✅ Firestore persistence (IndexedDB) включена');
      console.log('   → Локальное кэширование активировано');
      console.log('   → Offline поддержка включена');
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('⚠️ Persistence не включена: несколько вкладок открыто или InPrivate режим', err.message);
      } else if (err.code === 'unimplemented') {
        console.warn('⚠️ Persistence не поддерживается в этом браузере', err.message);
      } else {
        console.warn('⚠️ Ошибка включения persistence:', err);
      }
      // Продолжаем работу без persistence
    });
  
  isFirebaseReady = true;
  console.log('✅ Firebase инициализирован на проекте:', firebaseConfig.projectId);
  console.log('   → Работает в режиме GitHub Pages (HTTPS)');
  console.log('   → Поддерживается real-time синхронизация с Firestore');
  
} catch (err) {
  firebaseError = err;
  console.error('❌ КРИТИЧЕСКАЯ ОШИБКА при инициализации Firebase:', err);
  console.error('   Сообщение:', err.message);
  console.error('   Код:', err.code);
}

// ========== ЭКСПОРТИРУЕМ ==========
export { 
  app,           // Firebase App instance
  db,            // Firestore database instance
  isFirebaseReady,  // Boolean: готов ли Firebase
  firebaseError  // Error object если есть проблемы
};