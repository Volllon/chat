import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';

import InputFirstName from './Inputs/InputFirstName';
import useFormState from './hooks/useStateForm';
import InputLastName from './Inputs/InputLastName';
import InputRepeatePassword from './Inputs/InputRepeatePassword';
import isValidInputRepeatePassword from './Inputs/InputRepeatePassword/scripts/isValidInput';

const FormRegistration: FC = () => {
  const {
    firstName,
    lastName,
    email,
    password,
    repeatePassword,
    isValidForm,
    setIsValidForm
  } = useFormState();

  const handleClick = () => {
    //
  }

  useEffect(() => {
    const isAllValidFields = 
      firstName.isValid
      && lastName.isValid
      && email.isValid
      && password.isValid
      && repeatePassword.isValid;

    setIsValidForm(isAllValidFields ? true : false);
  }, [
    firstName.isValid,
    lastName.isValid,
    email.isValid,
    password.isValid,
    repeatePassword.isValid
  ]);

  useEffect(() => {
    repeatePassword.setIsValid(
      isValidInputRepeatePassword(repeatePassword.value, password.value)
    );
  }, [password.value]);

  return (
    <form
      className="col-12 col-md-8 col-lg-6 col-xl-4"
    >
      <div className="form-group">
        <label>First Name</label>
        <InputFirstName { ...firstName }/>
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <InputLastName { ...lastName }/>
      </div>

      <div className="form-group">
        <label>Email</label>
        <InputEmail { ...email }/>
      </div>

      <div className="form-group">
        <label>Password</label>
        <InputPassword { ...password }/>
      </div>

      <div className="form-group">
        <label>Repeate Password</label>
        <InputRepeatePassword
          { ...repeatePassword }
          passwordValue= { password.value }
        />
      </div>

      <div className="row text-center">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={ handleClick }
            disabled={ !isValidForm }
          >
            Sign Up
          </button>
          <div className="mt-1">
            <Link to="/authorization">Sign In</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormRegistration;
