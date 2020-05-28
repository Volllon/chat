import { useState } from 'react';
import { InputValue } from '../../types';

export default (val: InputValue, isValidVal: boolean) => {
  const [value, setValue] = useState<InputValue>(val);
  const [isValid, setIsValid] = useState(isValidVal);

  return {
    value,
    setValue,
    isValid,
    setIsValid
  }
}
