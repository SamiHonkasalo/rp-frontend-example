import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import { UIContext } from '../../../store/ui/uiContext';
import { UITypes } from '../../../store/ui/uiReducer';

const useStyles = makeStyles((theme: Theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  },
  warning: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
  info: {},
}));

const Notification: React.FC = () => {
  const { state, dispatch } = useContext(UIContext);
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const notification = state.notifications[0];

  useEffect(() => {
    setOpen(!!notification);
  }, [notification]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    dispatch({
      type: UITypes.HIDE_NOTIFICATION,
    });
  };

  const typeClass = notification && classes[notification.type || 'info'];

  return (
    <Snackbar
      open={open}
      autoHideDuration={(notification && notification.hideDuration) || 4000}
      onExited={handleExited}
      onClose={handleClose}
      message={notification && notification.message}
      ContentProps={{
        className: typeClass,
      }}
    />
  );
};

export default Notification;
