export enum UITypes {
  OPEN_SIDEDRAWER = 'OPEN_SIDEDRAWER',
  CLOSE_SIDEDRAWER = 'CLOSE_SIDEDRAWER',
}

type UIPayload = {
  [UITypes.OPEN_SIDEDRAWER]: undefined;
  [UITypes.CLOSE_SIDEDRAWER]: undefined;
};

export type UIActions = ActionMap<UIPayload>[keyof ActionMap<UIPayload>];

export type UIState = {
  sideDrawerOpen: boolean;
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

    default:
      return state;
  }
};

export default uiReducer;
