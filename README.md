# University of East Florida (UEF) - 100% Online Global Web App

Official Web Application for **University of East Florida**, featuring:
- 🏛️ Official Crest & Luxury Maroon & Gold Aesthetic
- 📚 100% Online Theoretical Degree Catalog
- 📄 Interactive PDF Course Brochure Generator & Downloader
- 🎓 Student Marks & GPA Eligibility Evaluator (US 4.0, ECTS, %)
- 📁 Drag & Drop Marksheet & Transcript Upload Portal
- 📨 Instant Confirmation Email & Application Receipt System
- 🔥 Firebase Firestore Database & Local Storage Engine Integration
- 🚀 Ready for Git & Vercel Deployment

---

## 🛠️ Step-by-Step Instructions: Firebase Setup & Vercel Deployment

### 1. Connect Your Live Firebase Database

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project named `university-east-florida`.
2. Enable **Firestore Database** in test mode or production mode.
3. In **Project Settings** -> **General** -> **Your Apps**, register a new Web App (`</>`).
4. Copy your Firebase Configuration snippet.
5. Open [`js/firebase-config.js`](file:///d:/antigravity%20projects/js/firebase-config.js) and replace `firebaseConfig` keys with your keys:

```js
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_FIREBASE_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

---

### 2. Deploy to Vercel via Git

#### Step A: Push Code to GitHub / Git Repository
Run the following commands in your terminal:

```bash
git init
git add .
git commit -m "Deploy University of East Florida web app with Firebase & Marksheet Portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/university-east-florida.git
git push -u origin main
```

#### Step B: Deploy on Vercel
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **"Add New Project"** -> **"Import Git Repository"**.
3. Select your `university-east-florida` GitHub repository.
4. Framework Preset: **Other** (or Static HTML).
5. Root Directory: `./`
6. Click **"Deploy"**!

Vercel will build and launch your live URL (e.g., `https://university-east-florida.vercel.app`).
