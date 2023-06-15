import React, { createContext, useState } from 'react';

export const UserContext = createContext(
  {
    user: null,
    setUser: () => {},
    settings: null,
    setSettings: () => {},
    isLoading: false,
    setIsLoading: () => {}
  }
)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <UserContext.Provider value={{ 
      user, setUser, 
      settings, setSettings,
      isLoading, setIsLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};
