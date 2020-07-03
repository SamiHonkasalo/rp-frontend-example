import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
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

interface FormInputs {
  oilLimit: number;
}

const HarvesterItem = ({ harvester, handleButtonClick }: Props) => {
  const { register, handleSubmit, errors, reset } = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const handleEditToggle = () => {
    if (editMode) {
      reset();
    }
    setEditMode((prevMode) => !prevMode);
  };

  const onSubmit = (data: FormInputs) => {
    console.log('submit');
    console.log(data);
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
            <IconButton
              title={editMode ? 'Cancel' : 'Edit'}
              aria-label={editMode ? 'cancel' : 'edit'}
              onClick={handleEditToggle}
              color="primary"
            >
              {editMode ? <ClearIcon /> : <EditIcon />}
            </IconButton>
            <IconButton
              title="Show on map"
              color="secondary"
              aria-label="show on map"
              onClick={() => handleButtonClick(harvester.id)}
            >
              <MapIcon />
            </IconButton>
          </>
        }
        title={harvester.name}
        subheader="More harvester info?"
      />
      <CardContent>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                harvester={harvester}
                label="Location"
                defaultValue={`lat: ${harvester.location.lat.toFixed(4)} 
              lng: ${harvester.location.lng.toFixed(4)}`}
                type="text"
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                harvester={harvester}
                label="Region"
                defaultValue="Unknown region"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                harvester={harvester}
                name="oilLevel"
                label="Oil level"
                type="number"
                unit="%"
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <HarvesterField
                harvester={harvester}
                name="oilLimit"
                label="Oil level limit"
                type="number"
                unit="%"
                step={0.1}
                editable
                edit={editMode}
                inputRef={register({ required: true, min: 10, max: 80 })}
                errors={errors}
              />
            </Grid>
          </Grid>
          <CardActions>
            {editMode && (
              <div style={{ marginLeft: 'auto' }}>
                <IconButton
                  type="submit"
                  aria-label="save"
                  color="secondary"
                  title="Save"
                >
                  <SaveIcon />
                </IconButton>
              </div>
            )}
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default HarvesterItem;
