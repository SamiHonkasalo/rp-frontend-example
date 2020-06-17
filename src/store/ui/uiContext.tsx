import React, { createContext, useReducer, Dispatch } from 'react';
import uiReducer, { UIState, UIActions } from './uiReducer';

const initialState: UIState = {
  sideDrawerOpen: true,
  sideDrawerTransitioned: true,
  themeMode: false,
  notifications: [] as NotificationType[],
};

interface UIContextInterface {
  state: UIState;
  dispatch: Dispatch<UIActions>;
}

const UIContext = createContext<UIContextInterface>({
  state: initialState,
  dispatch: () => null,
});

const UIProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider, UIContext };
