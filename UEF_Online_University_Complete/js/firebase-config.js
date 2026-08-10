/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - FIREBASE & STORAGE CONFIGURATION
   ========================================================================== */

// Firebase SDK Configuration Template
// Replace the keys below with your official Firebase Console Credentials:
// Firebase Console -> Project Settings -> General -> Your Apps -> SDK Setup
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "university-east-florida.firebaseapp.com",
  projectId: "university-east-florida",
  storageBucket: "university-east-florida.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456789"
};

// Fallback Local Storage Persistence Engine (Used when live Firebase API Key is pending)
class FirebaseStorageManager {
  constructor() {
    this.collectionName = "uef_student_applications";
  }

  async saveApplication(applicationData) {
    console.log("🔥 [Firebase Engine] Saving application record...", applicationData);

    try {
      // If live Firebase SDK is loaded in window, push to Firestore:
      if (window.db && typeof window.db.collection === "function") {
        const docRef = await window.db.collection("student_applications").add(applicationData);
        console.log("✅ Saved to live Firebase Firestore with ID:", docRef.id);
        return { success: true, id: docRef.id, isLiveFirebase: true };
      }
    } catch (err) {
      console.warn("⚠️ Live Firebase Firestore not connected yet, saving to Local Firebase Store:", err);
    }

    // Local Firebase Store Fallback (Persists across browser refreshes)
    let existingApps = JSON.parse(localStorage.getItem(this.collectionName) || "[]");
    existingApps.unshift(applicationData);
    localStorage.setItem(this.collectionName, JSON.stringify(existingApps));

    return { success: true, id: applicationData.trackingId, isLiveFirebase: false };
  }

  async getApplications() {
    return JSON.parse(localStorage.getItem(this.collectionName) || "[]");
  }
}

window.firebaseManager = new FirebaseStorageManager();
