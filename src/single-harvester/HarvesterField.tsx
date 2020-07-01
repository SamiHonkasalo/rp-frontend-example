import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { FieldError } from 'react-hook-form/dist/types/form';

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
  defaultValue: string | number;
  type: React.InputHTMLAttributes<unknown>['type'];
  unit?: string;
  editable?: boolean;
  edit?: boolean;
  multiline?: boolean;
  inputRef?: any;
  name?: string;
  errors?: FieldError;
  onChange?: (val: unknown, name: string) => void;
}

const HarvesterField = ({
  label,
  defaultValue,
  type,
  unit = '',
  editable,
  edit = false,
  multiline = false,
  inputRef,
  name,
  errors,
  onChange,
}: Props) => {
  const classes = useStyles();
  let errorText = '';
  const errType = errors?.type;
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

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    if (onChange) {
      onChange(e.target.value, name || label);
    }
  };

  return (
    <TextField
      id={label}
      label={label}
      type={type}
      name={name || label}
      defaultValue={defaultValue}
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
          step: 0.1,
        },
      }}
      multiline={multiline}
      inputRef={inputRef}
      error={!!errors}
      helperText={errorText}
      onChange={handleChange}
    />
  );
};

export default HarvesterField;
