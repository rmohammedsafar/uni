/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - FIREBASE FIRESTORE & AUTHENTICATION CONFIG
   Project ID: university-8f798
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyBdr96TA2n_N0Rohk9Yd8CbamOYn_ZJQt0",
  authDomain: "university-8f798.firebaseapp.com",
  projectId: "university-8f798",
  storageBucket: "university-8f798.firebasestorage.app",
  messagingSenderId: "809688294574",
  appId: "1:809688294574:web:5efc430fd6bde7e04af93f",
  measurementId: "G-0VXXK61R3R"
};

// Initialize Firebase App
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("🔥 Live Firebase App Initialized for university-8f798");
}

if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
  window.db = firebase.firestore();
  try {
    window.auth = firebase.auth();
    window.googleProvider = new firebase.auth.GoogleAuthProvider();
    console.log("🔑 Firebase Auth & Google Identity Provider Initialized");
  } catch (e) {
    console.log("Firebase Auth Initializer fallback");
  }
}

// Global Firebase Storage & Application Manager
class FirebaseStorageManager {
  constructor() {
    this.collectionName = 'student_applications';
    this.fallbackStorageKey = 'uef_student_applications_backup';
  }

  // Save new student application
  async saveApplication(appData) {
    console.log("💾 Saving application record:", appData);
    
    // 1. Live Cloud Firestore Sync
    if (window.db) {
      try {
        await window.db.collection(this.collectionName).doc(appData.trackingId).set(appData);
        console.log("✅ Successfully saved to Cloud Firestore:", appData.trackingId);
      } catch (err) {
        console.warn("⚠️ Firestore network warning (Using Local Backup Fallback):", err);
      }
    }

    // 2. Persistent Local Storage Engine
    this.saveToLocalStorage(appData);
    return appData;
  }

  // Fetch all applications for Admin Dashboard
  async getApplications() {
    let firestoreRecords = [];

    if (window.db) {
      try {
        const snapshot = await window.db.collection(this.collectionName).get();
        snapshot.forEach(doc => {
          firestoreRecords.push(doc.data());
        });
      } catch (err) {
        console.warn("⚠️ Firestore fetch warning:", err);
      }
    }

    const localRecords = this.getFromLocalStorage();
    const mergedMap = new Map();
    
    localRecords.forEach(rec => mergedMap.set(rec.trackingId, rec));
    firestoreRecords.forEach(rec => mergedMap.set(rec.trackingId, rec));

    const result = Array.from(mergedMap.values());
    result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    return result;
  }

  // Update Decision Status
  async updateStatus(trackingId, newStatus) {
    if (window.db) {
      try {
        await window.db.collection(this.collectionName).doc(trackingId).update({ status: newStatus });
      } catch (e) {
        console.warn("Status update fallback:", e);
      }
    }

    const local = this.getFromLocalStorage();
    const item = local.find(i => i.trackingId === trackingId);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(this.fallbackStorageKey, JSON.stringify(local));
    }
  }

  saveToLocalStorage(appData) {
    let current = this.getFromLocalStorage();
    current.unshift(appData);
    localStorage.setItem(this.fallbackStorageKey, JSON.stringify(current));
  }

  getFromLocalStorage() {
    const raw = localStorage.getItem(this.fallbackStorageKey);
    return raw ? JSON.parse(raw) : [];
  }
}

window.firebaseManager = new FirebaseStorageManager();
