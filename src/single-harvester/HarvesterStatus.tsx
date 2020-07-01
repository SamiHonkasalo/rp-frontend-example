import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    padding: theme.spacing(1),
  },
}));

interface Props {
  title: string;
  text: string;
}

const HarvesterStatus = ({ title, text }: Props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={2}>
      <Card className={classes.card}>
        <CardHeader
          title={title}
          subheader={text}
          subheaderTypographyProps={{
            style: {
              marginTop: 10,
              whiteSpace: 'pre-line',
            },
          }}
        />
      </Card>
    </Grid>
  );
};

export default HarvesterStatus;
