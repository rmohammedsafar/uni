/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - FIREBASE & STORAGE CONFIGURATION
   ========================================================================== */

// Firebase SDK Configuration Template
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
    this.initSeedData();
  }

  initSeedData() {
    let existingApps = JSON.parse(localStorage.getItem(this.collectionName) || "[]");
    if (existingApps.length === 0) {
      // Seed initial sample applications for demo testing
      const seedApps = [
        {
          trackingId: "UEF-2026-REG-9482",
          fullName: "Sophia Rodriguez",
          email: "sophia.rodriguez@example.com",
          phone: "+1 (305) 555-0142",
          country: "United States",
          programId: "ms-cs-ai",
          programTitle: "Computer Science & Artificial Intelligence",
          degree: "Master of Science",
          previousSchool: "Florida International University",
          uploadedMarksheets: [
            { name: "BS_ComputerScience_Transcript.pdf", size: "2.4 MB" },
            { name: "HighSchool_Diploma.pdf", size: "1.1 MB" }
          ],
          submittedAt: "Aug 10, 2026 at 09:30 AM",
          status: "ADMITTED - OFFER ISSUED"
        },
        {
          trackingId: "UEF-2026-REG-8371",
          fullName: "Rohan Sharma",
          email: "rohan.sharma@example.com",
          phone: "+91 98765 43210",
          country: "India",
          programId: "global-mba",
          programTitle: "Global MBA & Digital Leadership",
          degree: "Master of Business Administration",
          previousSchool: "Delhi Technological University",
          uploadedMarksheets: [
            { name: "BTech_Semester_Marksheets.pdf", size: "3.8 MB" }
          ],
          submittedAt: "Aug 10, 2026 at 10:15 AM",
          status: "APPLICATION UNDER REVIEW"
        }
      ];
      localStorage.setItem(this.collectionName, JSON.stringify(seedApps));
    }
  }

  async saveApplication(applicationData) {
    console.log("🔥 [Firebase Engine] Saving application record...", applicationData);

    try {
      if (window.db && typeof window.db.collection === "function") {
        const docRef = await window.db.collection("student_applications").add(applicationData);
        console.log("✅ Saved to live Firebase Firestore with ID:", docRef.id);
        return { success: true, id: docRef.id, isLiveFirebase: true };
      }
    } catch (err) {
      console.warn("⚠️ Live Firebase Firestore not connected yet, saving to Local Firebase Store:", err);
    }

    let existingApps = JSON.parse(localStorage.getItem(this.collectionName) || "[]");
    existingApps.unshift(applicationData);
    localStorage.setItem(this.collectionName, JSON.stringify(existingApps));

    return { success: true, id: applicationData.trackingId, isLiveFirebase: false };
  }

  async getApplications() {
    return JSON.parse(localStorage.getItem(this.collectionName) || "[]");
  }

  async updateStatus(trackingId, newStatus) {
    let existingApps = JSON.parse(localStorage.getItem(this.collectionName) || "[]");
    let updated = false;

    existingApps = existingApps.map(app => {
      if (app.trackingId === trackingId) {
        app.status = newStatus;
        updated = true;
      }
      return app;
    });

    if (updated) {
      localStorage.setItem(this.collectionName, JSON.stringify(existingApps));
    }
    return updated;
  }
}

window.firebaseManager = new FirebaseStorageManager();
