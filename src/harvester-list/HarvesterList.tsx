import React, { useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { HarvesterContext } from '../store/harvester/harvesterContext';
import HarvesterTable from './HarvesterTable';
import HarvesterCards from './HarvesterCards';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    margin: 'auto',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const HarvesterList = () => {
  const classes = useStyles();
  const history = useHistory();
  const harvContext = useContext(HarvesterContext);
  const { harvesters, setSelectedHarvester } = harvContext;
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleItemClick = (event: React.MouseEvent<unknown>, id: string) => {
    // Do not redirect if the button has been clicked
    if (
      event.target instanceof Element &&
      typeof event.target.className === 'string'
    ) {
      if (!event.target.className.includes('Button')) {
        history.push(`/harvesters/${id}`);
      }
    }
  };

  const handleButtonClick = (id: string) => {
    setSelectedHarvester(id);
    history.push('/');
  };

  return (
    <div className={classes.container}>
      {isSmall ? (
        <HarvesterCards
          harvesters={harvesters}
          handleCardClick={handleItemClick}
          handleButtonClick={handleButtonClick}
        />
      ) : (
        <HarvesterTable
          harvesters={harvesters}
          handleRowClick={handleItemClick}
          handleButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
};

export default HarvesterList;
