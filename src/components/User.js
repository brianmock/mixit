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
      alignItems: 'flex-end',
      width: '100%',
      marginTop: '0.5rem',
      gap: '0.5rem',
      }}>
      <Button
        onClick={() => setShowMenu(prevState => !prevState)}
        style={{ margin: 0, marginRight: '0.5rem' }}
    >
        {image || user.email}
      </Button>
      {showMenu ? (
        <>
          <Button
            onClick={() => {
              setShowMenu(false);
              setStep(4)
            }}
            style={{ margin: 0, marginRight: '0.5rem' }}
          >
            History
          </Button>
          <Button
            onClick={() => {
              setShowMenu(false);
              setUser(null)
            }}
            style={{ margin: 0, marginRight: '0.5rem' }}
          >
            Sign out
          </Button>
        </>
      ): null}
    </div>
  );
}
