import React, { FC, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import api from '../../../api';
import setToken from '../../../scripts/localStorage/setToken';
import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';
import useFormState from './hooks/useStateForm';

const FormAuthorization: FC = () => {
  const history = useHistory();
  const {
    email,
    password,
    isValidForm,
    setIsValidForm
  } = useFormState();

  const handleClick = () => {
    const user = {
      email: email.value,
      password: password.value
    }

    api.signin(user)
      .then((response: AxiosResponse) => {
        const token = response?.data?.token;

        if (token) {
          setToken(token);
          history.push('/rooms');
          history.go(0);
        }
      });
  }

  useEffect(() => {
    const isAllValidFields = email.isValid && password.isValid;
    setIsValidForm(isAllValidFields ? true : false);
  }, [email.isValid, password.isValid, setIsValidForm]);

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
