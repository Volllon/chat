import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';

import useFormState from './hooks/useStateForm';

const FormAuthorization: FC = () => {
  const {
    email,
    password,
    isValidForm,
    setIsValidForm
  } = useFormState();

  const handleClick = () => {
    //
  }

  useEffect(() => {
    const isAllValidFields = email.isValid && password.isValid;
    setIsValidForm(isAllValidFields ? true : false);
  }, [email.isValid, password.isValid]);

  return (
    <form
      className="col-12 col-md-8 col-lg-6 col-xl-4"
    >
      <div className="form-group">
        <label>Email</label>
        <InputEmail { ...email }/>
      </div>

      <div className="form-group">
        <label>Password</label>
        <InputPassword { ...password }/>
      </div>

      <div className="row text-center">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={ handleClick }
            disabled={ !isValidForm }
          >
            Sign In
          </button>
          <div className="mt-1">
            <Link to="/registration">Sign Up</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormAuthorization;
