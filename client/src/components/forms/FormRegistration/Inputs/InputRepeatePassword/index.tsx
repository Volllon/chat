import React, { FC, ChangeEvent } from 'react';
import getValidationStatusClass from '../../../scripts/getValidationStatusClass';
import getTooltipAttributes from '../../../scripts/getTooltipAttributes';
import isValidInput from './scripts/isValidInput';
import { Props } from './types';

const InputRepeatePassword: FC<Props> = ({
  value,
  isValid,
  setValue,
  setIsValid,
  passwordValue
}) => {
  let validationStatusClass: string = '';

  if (value) {
    validationStatusClass = getValidationStatusClass(isValid);
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsValid(isValidInput(event.target.value, passwordValue));
  }

  return (
    <input
      type="password"
      className={ `form-control ${ validationStatusClass }` }
      value={ value }
      { ...getTooltipAttributes('repeatePassword') }
      onChange={ handleChange }
    />
  );
}

export default InputRepeatePassword;
