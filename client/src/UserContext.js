import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);


  return (
    <UserContext.Provider value={{ user, setUser, settings, setSettings }}>
      {children}
    </UserContext.Provider>
  );
};
