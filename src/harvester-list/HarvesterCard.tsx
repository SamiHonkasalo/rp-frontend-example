import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Tooltip } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles((theme) => ({
  cardTitleContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: theme.typography.body1,
  cardContentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0.5rem 0',
  },
}));

interface Props {
  harvester: HarvesterType;
  handleCardClick: (event: React.MouseEvent<unknown>, id: string) => void;
  handleButtonClick: (id: string) => void;
}

const HarvesterCard = ({
  harvester,
  handleCardClick,
  handleButtonClick,
}: Props) => {
  const classes = useStyles();
  return (
    <Card onClick={(event) => handleCardClick(event, harvester.id)}>
      <CardHeader
        title={
          <div className={classes.cardTitleContent}>
            <span>ID: {harvester.id}</span>
            <Tooltip title="Show on map" placement="bottom">
              <IconButton
                onClick={() => handleButtonClick(harvester.id)}
                aria-label="show on map"
              >
                <MapIcon />
              </IconButton>
            </Tooltip>
          </div>
        }
      />
      <CardContent className={classes.cardContent}>
        <span className={classes.cardContentRow}>Name: {harvester.name}</span>
        <span className={classes.cardContentRow}>
          Location: lat: {harvester.location.lat.toFixed(4)} lng:{' '}
          {harvester.location.lng.toFixed(4)}
        </span>
        <span className={classes.cardContentRow}>Region: Unknown region</span>
        <span className={classes.cardContentRow}>
          Oil level: {harvester.oilLevel}
        </span>
      </CardContent>
    </Card>
  );
};

export default HarvesterCard;
