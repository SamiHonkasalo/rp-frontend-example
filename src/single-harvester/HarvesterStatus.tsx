import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Grid,
  IconButton,
  CardActions,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    minHeight: '11.5rem',
    padding: theme.spacing(1),
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardActions: {
    padding: 0,
  },
}));

interface Props {
  title: string;
  text: string;
  unit?: string;
  edit?: boolean;
  inputType?: React.InputHTMLAttributes<unknown>['type'];
  inputDefaultValue?: unknown;
}

const HarvesterStatus = ({
  title,
  text,
  unit = '',
  edit,
  inputType = 'text',
  inputDefaultValue,
}: Props) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode((prevMode) => !prevMode);
  };
  console.log(inputDefaultValue);
  return (
    <Grid item xs={12} sm={6} md={2}>
      <Card className={classes.card}>
        <CardHeader
          title={title}
          subheader={
            editMode ? (
              <TextField
                id={title}
                type={inputType}
                defaultValue={inputDefaultValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{unit}</InputAdornment>
                  ),
                }}
              />
            ) : (
              `${text} ${unit}`
            )
          }
          action={
            edit && (
              <IconButton aria-label="edit" onClick={handleEditClick}>
                {editMode ? <ClearIcon /> : <EditIcon />}
              </IconButton>
            )
          }
          subheaderTypographyProps={{
            style: {
              marginTop: 10,
              whiteSpace: 'pre-line',
            },
          }}
        />
        <CardActions className={classes.cardActions} disableSpacing>
          {editMode && (
            <IconButton aria-label="save">
              <SaveIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HarvesterStatus;
