import validationSchemas from "./validationSchemas";
import { InputType, InputValue } from "../types";

export default (inputType: InputType, value: InputValue) => {
  return validationSchemas[inputType]!.isValidSync(value);
}
