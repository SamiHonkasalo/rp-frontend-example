import { useContext } from 'react';
import { UIContext } from '../../store/ui/uiContext';
import { UITypes } from '../../store/ui/uiReducer';

function useNotification() {
  const { dispatch } = useContext(UIContext);

  const notify = (notification: NotificationType) => {
    dispatch({
      type: UITypes.ADD_NOTIFICATION,
      payload: {
        message: notification.message,
        hideDuration: notification.hideDuration,
        type: notification.type,
      },
    });
  };
  return notify;
}

export default useNotification;
