import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles';
import { TextField } from '@material-ui/core';

const FormInput = ({ handleChange, label, ...props }) => (
  <GroupContainer>
    <TextField
      helperText=""
      variant="outlined"
      fullWidth
      label={label}
      onChange={handleChange}
      {...props}
    />
  </GroupContainer>
);

export default FormInput;
