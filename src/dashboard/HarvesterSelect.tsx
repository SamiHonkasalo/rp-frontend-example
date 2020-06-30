import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormHelperText, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    zIndex: 1,
  },
  selectInput: {
    width: '100%',
  },
}));

interface Props {
  harvesters: HarvesterType[];
  selectedHarvester: HarvesterType;
  handleSelectedChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const HarvesterSelect = ({
  harvesters,
  selectedHarvester,
  handleSelectedChange,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.selectContainer}>
      <Select
        value={selectedHarvester.id}
        onChange={handleSelectedChange}
        displayEmpty
        className={classes.selectInput}
        inputProps={{ 'aria-label': 'Harvester to follow' }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {harvesters.map((h) => (
          <MenuItem key={h.id} value={h.id}>
            {h.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Harvester to follow</FormHelperText>
    </div>
  );
};

export default HarvesterSelect;
