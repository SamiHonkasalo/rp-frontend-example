import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core/';
import { useHistory } from 'react-router-dom';

import { HarvesterContext } from '../store/harvester/harvesterContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const HarvesterList = () => {
  const classes = useStyles();
  const history = useHistory();
  const harvContext = useContext(HarvesterContext);
  const { harvesters } = harvContext;

  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    // Do not redirect if the button has been clicked
    if (event.target instanceof Element) {
      if (!event.target.className.includes('Button')) {
        history.push(`/harvesters/${id}`);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="harvester table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Oil Level</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {harvesters.map((h) => (
            <TableRow
              key={h.id}
              hover
              onClick={(event) => handleRowClick(event, h.id)}
              className={classes.tableRow}
            >
              <TableCell component="th" scope="row">
                {h.id}
              </TableCell>
              <TableCell>{h.name}</TableCell>
              <TableCell>
                lat: {h.location.lat.toFixed(4)} lng:{' '}
                {h.location.lng.toFixed(4)}
              </TableCell>
              <TableCell>Unknown region</TableCell>
              <TableCell>{h.oilLevel}</TableCell>
              <TableCell>
                <Button variant="outlined">SHOW ON MAP</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HarvesterList;
