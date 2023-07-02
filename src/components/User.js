import { useState } from 'react';
import { Button } from './common';

export function User({ user, setUser, setStep }) {
  const [showMenu, setShowMenu] = useState(false);

  if (!user) {
    return null;
  }

  const image = user.photoURL ? <img height={16} width={16} src={user.photoURL} /> : null;

  return (
    <div style={{
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: '0.5rem',
      gap: '0.5rem',
      }}>
      <Button
        onClick={() => setShowMenu(prevState => !prevState)}
    >
        welcome {user.email} {image}
      </Button>
      {showMenu ? (
        <>
          <Button onClick={() => {
            setShowMenu(false);
            setStep(4)
          }}>History</Button>
          <Button onClick={() => {
            setShowMenu(false);
            setUser(null)
          }}>Sign out</Button>
        </>
      ): null}
    </div>
  );
}
