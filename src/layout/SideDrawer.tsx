import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavList from './navigation/NavList';

const useStyles = makeStyles((theme: Theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: theme.sideDrawer.width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
}

const SideDrawer = ({ open, handleDrawerClose }: Props) => {
  const classes = useStyles();
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Drawer
      variant={isXSmall ? 'temporary' : 'permanent'}
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      onClose={handleDrawerClose}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <NavList />
      </List>
      <Divider />
      <List>{[]}</List>
    </Drawer>
  );
};

export default SideDrawer;
