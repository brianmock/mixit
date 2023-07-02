import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem('user');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return [user, setUser];
}
