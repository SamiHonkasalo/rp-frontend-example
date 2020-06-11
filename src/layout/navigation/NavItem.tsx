import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.secondary,
  },
  active: {
    // color: theme.palette.text.primary,
    color: theme.palette.primary.light,
    fontWeight: theme.typography.fontWeightBold,
  },
  itemText: {
    fontWeight: 'inherit',
  },
  icon: {
    color: 'inherit',
  },
}));

interface Props {
  to: string;
  primaryText: string;
  icon: React.ReactNode;
}

const NavItem = ({ to, primaryText, icon }: Props) => {
  const classes = useStyles();
  return (
    <NavLink
      to={to}
      exact
      activeClassName={classes.active}
      className={classes.link}
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon classes={{ root: classes.icon }}>{icon}</ListItemIcon>
        <ListItemText
          classes={{ primary: classes.itemText }}
          primary={primaryText}
        />
      </ListItem>
    </NavLink>
  );
};

export default NavItem;
