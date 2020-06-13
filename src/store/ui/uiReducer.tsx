export enum UITypes {
  OPEN_SIDEDRAWER = 'OPEN_SIDEDRAWER',
  CLOSE_SIDEDRAWER = 'CLOSE_SIDEDRAWER',
  SET_DARK_THEME = 'SET_DARK_THEME',
  SET_LIGHT_THEME = 'SET_LIGHT_THEME',
}

type UIPayload = {
  [UITypes.OPEN_SIDEDRAWER]: undefined;
  [UITypes.CLOSE_SIDEDRAWER]: undefined;
  [UITypes.SET_DARK_THEME]: undefined;
  [UITypes.SET_LIGHT_THEME]: undefined;
};

export type UIActions = ActionMap<UIPayload>[keyof ActionMap<UIPayload>];

export type UIState = {
  sideDrawerOpen: boolean;
  themeMode: boolean;
};

const uiReducer = (state: UIState, action: UIActions) => {
  switch (action.type) {
    case UITypes.OPEN_SIDEDRAWER:
      return {
        ...state,
        sideDrawerOpen: true,
      };
    case UITypes.CLOSE_SIDEDRAWER:
      return {
        ...state,
        sideDrawerOpen: false,
      };
    case UITypes.SET_DARK_THEME:
      return {
        ...state,
        themeMode: true,
      };
    case UITypes.SET_LIGHT_THEME:
      return {
        ...state,
        themeMode: false,
      };

    default:
      return state;
  }
};

export default uiReducer;
