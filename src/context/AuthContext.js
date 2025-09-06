import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [trackerData, setTrackerData] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
            setTrackerData(null);
            setIsAdminLoggedIn(false);
            return;
          }

          const trackerDocRef = doc(db, 'trackers', firebaseUser.uid);
          const trackerSnap = await getDoc(trackerDocRef);
          if (trackerSnap.exists()) {
            setTrackerData(trackerSnap.data());
            setUserData(null);
            setIsAdminLoggedIn(true);
          } else {
            setUserData(null);
            setTrackerData(null);
            setIsAdminLoggedIn(false);
          }
        } catch (error) {
          console.error('Error fetching user/tracker data:', error);
        }
      } else {
        setUserData(null);
        setTrackerData(null);
        setIsAdminLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        trackerData,
        setTrackerData,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

