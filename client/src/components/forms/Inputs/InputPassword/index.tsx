import React, { FC, ChangeEvent } from 'react';
import getValidationStatusClass from '../../scripts/getValidationStatusClass';
import isValidInput from '../../scripts/isValidInput';
import getTooltipAttributes from '../../scripts/getTooltipAttributes';
import { InputProps } from '../../types';

const InputPassword: FC<InputProps> = ({
  value,
  isValid,
  setValue,
  setIsValid
}) => {
  let validationStatusClass: string = '';

  if (value) {
    validationStatusClass = getValidationStatusClass(isValid);
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsValid(isValidInput('password', event.target.value));
  }

  return (
    <input
      type="password"
      className={ `form-control ${ validationStatusClass }` }
      value={ value }
      { ...getTooltipAttributes('password') }
      onChange={ handleChange }
    />
  );
}

export default InputPassword;
