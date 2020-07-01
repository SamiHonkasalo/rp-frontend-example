import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Tooltip,
  Grid,
} from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';

import HarvesterStatus from './HarvesterStatus';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Props {
  harvester: HarvesterType;
}

const HarvesterItem = ({ harvester }: Props) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="id" className={classes.avatar}>
            {harvester.id}
          </Avatar>
        }
        action={
          <Tooltip title="Show on map" placement="bottom">
            <IconButton aria-label="show on map">
              <MapIcon />
            </IconButton>
          </Tooltip>
        }
        title={harvester.name}
        subheader="More harvester info?"
      />
      <CardContent>
        <Grid container spacing={4}>
          <HarvesterStatus
            title="Oil level"
            text={`${harvester.oilLevel.toString()} %`}
          />
          <HarvesterStatus
            title="Location"
            text={`lat:${harvester.location.lat.toFixed(4)} 
            lng: ${harvester.location.lng.toFixed(4)}`}
          />
          <HarvesterStatus title="Region" text="Unknown region" />
        </Grid>
      </CardContent>
      <CardContent>INSERT GRAPH HERE</CardContent>
    </Card>
  );
};

export default HarvesterItem;
