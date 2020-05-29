import { useState } from "react";
import useStateInput from "../../hooks/useStateInput";

export default () => {
  const [isValidForm, setIsValidForm] = useState(false);

  return {
    email: useStateInput('', false),
    password: useStateInput('', false),
    isValidForm,
    setIsValidForm
  };
}
