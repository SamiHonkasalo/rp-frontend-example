import React, { createContext, useState, useCallback, useEffect } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  username: string;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  username: '',
  login: () => null,
  logout: () => null,
});

const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // On mount, automatically login if data in localstorage
  useEffect(() => {
    const lsData = localStorage.getItem('userData');
    const lsUserData = lsData && JSON.parse(lsData);
    if (lsUserData && lsUserData.username) {
      setIsLoggedIn(true);
      setUsername(lsUserData.username);
    }
  }, []);

  const login = useCallback((user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    // Set data to localstraoge on login
    localStorage.setItem('userData', JSON.stringify({ username: user }));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername('');
    // Remove data from localstorage on logout
    localStorage.removeItem('userData');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
