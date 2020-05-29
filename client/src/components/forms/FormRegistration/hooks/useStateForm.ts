import { useState } from "react";
import useStateInput from "../../hooks/useStateInput";

export default () => {
  const [isValidForm, setIsValidForm] = useState(false);

  return {
    firstName: useStateInput('', false),
    lastName: useStateInput('', false),
    email: useStateInput('', false),
    password: useStateInput('', false),
    repeatePassword: useStateInput('', false),
    isValidForm,
    setIsValidForm
  };
}
