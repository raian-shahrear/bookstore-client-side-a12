import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.config'


const auth = getAuth(app);
export const UserContext = createContext();

const AuthContext = ({children}) => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // update user
  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  // signIn user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // reset password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  }

  // get the currently logged in user
  useEffect( ()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    })
    return () => {
      unsubscribe();
    }
  }, [])

  //google user
  const googleUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  //facebook user
  const facebookUser = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  }

  // signOut user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }

  const authInfo = {user, loading, createUser, updateUser, signInUser, resetPassword, googleUser, facebookUser, signOutUser};
  return (
    <UserContext.Provider value={authInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;