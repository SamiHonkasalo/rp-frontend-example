import React, { createContext, useState, useCallback } from 'react';

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

  const login = useCallback((user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername('');
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
