import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core/';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

interface Props {
  username: string;
  handleLogout: () => void;
}

const LogoutButton = ({ username, handleLogout }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <ListItem button onClick={handleOpen}>
        <ListItemIcon classes={{ root: classes.icon }}>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText
          title={username}
          classes={{ primary: classes.itemText }}
          primary={username}
          primaryTypographyProps={{ noWrap: true }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            title="Logout"
            onClick={handleLogout}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default LogoutButton;
