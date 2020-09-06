import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    display: 'block',
  },
  active: {
    borderLeft: `3px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
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
  exact?: boolean;
}

const NavItem: React.FC<Props> = ({
  to,
  primaryText,
  icon,
  exact = true,
}: Props) => {
  const classes = useStyles();
  return (
    <NavLink
      title={primaryText}
      to={to}
      exact={exact}
      activeClassName={classes.active}
      className={classes.link}
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
