import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

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
}

const NavItem: React.FC<Props> = ({ to, primaryText, icon }: Props) => {
  const classes = useStyles();
  return (
    <Tooltip title={primaryText}>
      <NavLink
        to={to}
        exact
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
    </Tooltip>
  );
};

export default NavItem;
