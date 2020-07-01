import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Tooltip,
  Grid,
  CardActions,
} from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

import HarvesterField from './HarvesterField';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
  },
}));

interface Props {
  harvester: HarvesterType;
  handleButtonClick: (id: string) => void;
}

const HarvesterItem = ({ harvester, handleButtonClick }: Props) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const handleEditToggle = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="id" className={classes.avatar}>
            {harvester.id}
          </Avatar>
        }
        action={
          <>
            <Tooltip title="Edit" placement="bottom">
              <IconButton aria-label="edit" onClick={handleEditToggle}>
                {editMode ? <ClearIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Show on map" placement="bottom">
              <IconButton
                aria-label="show on map"
                onClick={() => handleButtonClick(harvester.id)}
              >
                <MapIcon />
              </IconButton>
            </Tooltip>
          </>
        }
        title={harvester.name}
        subheader="More harvester info?"
      />
      <CardContent>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                label="Location"
                value={`lat: ${harvester.location.lat.toFixed(4)} 
              lng: ${harvester.location.lng.toFixed(4)}`}
                type="text"
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                label="Region"
                value="Unknown region"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                label="Oil level"
                value={harvester.oilLevel}
                type="number"
                unit="%"
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                label="Oil level limit"
                value={harvester.oilLimit}
                type="number"
                unit="%"
                editable
                edit={editMode}
              />
            </Grid>
          </Grid>
          <CardActions>
            {editMode && (
              <div style={{ marginLeft: 'auto' }}>
                <Tooltip title="Save" placement="bottom">
                  <IconButton type="submit" aria-label="save">
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default HarvesterItem;
