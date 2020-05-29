import { InputValue } from "../../../../types";

export default (repeatePasswordValue: InputValue, passwordValue: InputValue) => {
  return repeatePasswordValue === passwordValue;
}
