import React from 'react';

export const Context = React.createContext(null);

const Provider = ({ children }) => (
  <Context.Provider value={{}}>{children}</Context.Provider>
);

export default Provider;
