import { useState } from 'react';
import { ReactComponent as GoogleLogo } from './common/google.svg';

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
        console.log(code, message);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(code, message);
        setError(message);
        // ...
      });
  }


  return user ? null : (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        marginTop: '0.5rem',
        gap: '0.5rem',
      }}
    >
      <Button
        onClick={handleGoogleSignIn}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', margin: 0, marginRight: '0.5rem' }}
      >
        <GoogleLogo />
      </Button>
      <span sx={{ color: 'red' }}>{error}</span>
    </div>
  );
}
