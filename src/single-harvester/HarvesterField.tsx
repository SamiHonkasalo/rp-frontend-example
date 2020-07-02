import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import { FieldErrors } from 'react-hook-form/dist/types/form';

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
  harvester: HarvesterType;
  name?: keyof HarvesterType;
  label: string;
  defaultValue?: string | number;
  type: React.InputHTMLAttributes<unknown>['type'];
  unit?: string;
  editable?: boolean;
  edit?: boolean;
  multiline?: boolean;
  step?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: any;
  errors?: FieldErrors;
}

const HarvesterField = ({
  harvester,
  label,
  defaultValue,
  type,
  unit = '',
  editable,
  edit = false,
  multiline = false,
  step = 1,
  inputRef,
  name,
  errors,
}: Props) => {
  const classes = useStyles();
  let errorText = '';
  const errType = errors && name && errors[name]?.type;
  if (errType) {
    switch (errType) {
      case 'required':
        errorText = 'This field is required';
        break;
      case 'max':
        errorText = 'Value too high';
        break;
      case 'min':
        errorText = 'Value too low';
        break;
      default:
        break;
    }
  }

  return (
    <TextField
      id={label}
      label={label}
      type={type}
      name={name || label}
      defaultValue={defaultValue || (name && harvester[name])}
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
          step,
        },
      }}
      multiline={multiline}
      inputRef={inputRef}
      error={errors && name && !!errors[name]}
      helperText={errorText}
    />
  );
};

export default HarvesterField;
