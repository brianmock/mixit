import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from '../api/auth';
import { Button } from './common';

const provider = new GoogleAuthProvider();

export default function Auth({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setUser(user);
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code, message);
        setError(message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setUser(user);
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code, message);
        setError(message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
      }).catch((error) => {
        const { code, message } = error;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(code, message);
        setError(message);
        // ...
      });
  }


  return (
    <>
      {error}
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleCreateAccount}>
        Create account
      </Button>
      <Button onClick={handleSignIn}>
        Sign in
      </Button>
      <Button onClick={handleGoogleSignIn}>
        Google
      </Button>
    </>
  );
}
