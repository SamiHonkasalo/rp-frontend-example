import React, { createContext, useReducer, Dispatch } from 'react';
import uiReducer, { UIState, UIActions } from './uiReducer';

const initialState: UIState = {
  sideDrawerOpen: true,
  themeMode: false,
  notifications: [] as NotificationType[],
};

interface UIContext {
  state: UIState;
  dispatch: Dispatch<UIActions>;
}

const UIContext = createContext<UIContext>({
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
