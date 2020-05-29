import { InputType, InputValue } from "../types";
import validationSchemas from "./validationSchemas";

export default (inputType: InputType, value: InputValue) => {
  return validationSchemas[inputType]!.isValidSync(value);
}
