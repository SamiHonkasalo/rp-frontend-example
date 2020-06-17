export enum UITypes {
  OPEN_SIDEDRAWER = 'OPEN_SIDEDRAWER',
  CLOSE_SIDEDRAWER = 'CLOSE_SIDEDRAWER',
  TOGGLE_TRANSITIONED = 'TOGGLE_TRANSITIONED',
  SET_DARK_THEME = 'SET_DARK_THEME',
  SET_LIGHT_THEME = 'SET_LIGHT_THEME',
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  HIDE_NOTIFICATION = 'HIDE_NOTIFICATION',
}

type UIPayload = {
  [UITypes.OPEN_SIDEDRAWER]: undefined;
  [UITypes.CLOSE_SIDEDRAWER]: undefined;
  [UITypes.SET_DARK_THEME]: undefined;
  [UITypes.SET_LIGHT_THEME]: undefined;
  [UITypes.ADD_NOTIFICATION]: NotificationType;
  [UITypes.HIDE_NOTIFICATION]: undefined;
  [UITypes.TOGGLE_TRANSITIONED]: undefined;
};

export type UIActions = ActionMap<UIPayload>[keyof ActionMap<UIPayload>];

export type UIState = {
  sideDrawerOpen: boolean;
  sideDrawerTransitioned: boolean;
  themeMode: boolean;
  notifications: NotificationType[];
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
    case UITypes.TOGGLE_TRANSITIONED:
      return {
        ...state,
        sideDrawerTransitioned: state.sideDrawerOpen,
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
    case UITypes.ADD_NOTIFICATION: {
      const curNotifs = [...state.notifications];
      curNotifs.push(action.payload);
      return {
        ...state,
        notifications: curNotifs,
      };
    }
    case UITypes.HIDE_NOTIFICATION: {
      const curNotifs = [...state.notifications];
      curNotifs.shift();
      return {
        ...state,
        notifications: curNotifs,
      };
    }

    default:
      return state;
  }
};

export default uiReducer;
