import { Dispatch, SetStateAction } from "react";

export type InputType = 
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'repeatePassword';

export type InputValue = string;

export type InputProps = {
  value: InputValue;
  isValid: boolean;
  setValue: Dispatch<SetStateAction<InputValue>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}
