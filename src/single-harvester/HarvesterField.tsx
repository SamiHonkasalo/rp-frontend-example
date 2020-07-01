import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    height: '100%',
  },
  inputBase: {
    height: '100%',
  },
  multiLineText: {
    whiteSpace: 'pre-line',
  },
}));

interface Props {
  label: string;
  value: string | number;
  type: React.InputHTMLAttributes<unknown>['type'];
  unit?: string;
  editable?: boolean;
  edit?: boolean;
  multiline?: boolean;
}

const HarvesterField = ({
  label,
  value,
  type,
  unit = '',
  editable,
  edit = false,
  multiline = false,
}: Props) => {
  const classes = useStyles();
  return (
    <TextField
      id={label}
      label={label}
      type={type}
      defaultValue={value}
      classes={{ root: classes.textField }}
      InputProps={{
        startAdornment: unit && (
          <InputAdornment position="start">{unit}</InputAdornment>
        ),
        readOnly: !edit,
        classes: { root: classes.inputBase },
        disableUnderline: !editable,
        inputProps: {
          className: classes.multiLineText,
        },
      }}
      multiline={multiline}
    />
  );
};

export default HarvesterField;
