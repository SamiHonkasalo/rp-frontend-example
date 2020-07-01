import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

interface Props {}

const HarvesterGraph = ({}: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Oil level" />
      <CardContent>INSERT GRAPH HERE</CardContent>
    </Card>
  );
};

export default HarvesterGraph;
