import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.sideDrawer.closedWidth,
      width: `calc(100% - ${theme.sideDrawer.closedWidth}px)`,
    },
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: theme.sideDrawer.width,
    width: `calc(100% - ${theme.sideDrawer.width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

interface Props {
  open: boolean;
  themeMode: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  handleThemeSwitch: () => void;
}

const AppBar = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  handleThemeSwitch,
  themeMode,
}: Props) => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <MuiAppBar
      position="absolute"
      className={clsx(classes.appBar, open && !isSmall && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerClose}
          className={clsx(
            classes.menuButton,
            !open && classes.menuButtonHidden
          )}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleThemeSwitch}>
          {themeMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
