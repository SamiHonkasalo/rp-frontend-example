import React, { createContext, useReducer, Dispatch, useEffect } from 'react';
import uiReducer, { UIState, UIActions, UITypes } from './uiReducer';

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

  // On mount, set the current theme depending on local storage
  useEffect(() => {
    const lsThemeMode = localStorage.getItem('themeMode');
    if (lsThemeMode === 'dark') {
      dispatch({ type: UITypes.SET_DARK_THEME });
    } else if (lsThemeMode === 'light') {
      dispatch({ type: UITypes.SET_LIGHT_THEME });
    }
  }, []);

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider, UIContext };
