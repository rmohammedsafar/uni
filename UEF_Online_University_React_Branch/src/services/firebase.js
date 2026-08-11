/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - FIREBASE FIRESTORE INTEGRATION SERVICE
   Project ID: university-8f798
   ========================================================================== */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBdr96TA2n_N0Rohk9Yd8CbamOYn_ZJQt0",
  authDomain: "university-8f798.firebaseapp.com",
  projectId: "university-8f798",
  storageBucket: "university-8f798.firebasestorage.app",
  messagingSenderId: "809688294574",
  appId: "1:809688294574:web:5efc430fd6bde7e04af93f",
  measurementId: "G-0VXXK61R3R"
};

const LOCAL_CMS_KEY = 'uef_cms_config';
const LOCAL_APPS_KEY = 'uef_student_applications_backup';

export const saveCMSConfigToStorage = (programs) => {
  try {
    const configData = {
      programs,
      isCustomized: true,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_CMS_KEY, JSON.stringify(configData));
  } catch (e) {
    console.warn("LocalStorage save warning:", e);
  }
};

export const loadCMSConfigFromStorage = () => {
  try {
    const raw = localStorage.getItem(LOCAL_CMS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.programs)) {
        return parsed.programs;
      }
    }
  } catch (e) {
    console.warn("LocalStorage load warning:", e);
  }
  return null;
};

export const saveApplicationRecord = (appData) => {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(appData);
    localStorage.setItem(LOCAL_APPS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Application save warning:", e);
  }
  return appData;
};

export const getApplicationRecords = () => {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};
