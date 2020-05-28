import React, {FC, ChangeEvent } from 'react';
import getValidationStatusClass from '../../../scripts/getValidationStatusClass';
import isValidInput from '../../../scripts/isValidInput';
import { InputProps } from '../../../types';
import getTooltipAttributes from '../../../scripts/getTooltipAttributes';

const InputFirstName: FC<InputProps> = ({
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
    setIsValid(isValidInput('firstName', event.target.value));
  }
  
  return (
    <input
      type="text"
      className={ `form-control ${ validationStatusClass }` }
      value={ value }
      { ...getTooltipAttributes('firstName') }
      onChange={ handleChange }
    />
  );
}

export default InputFirstName;
