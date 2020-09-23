import React from 'react';
import {Formik, Form, Field} from 'formik';
import Input from './form_elements/Input';
import * as Yup from 'yup';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from  "react-router-dom";
import {Thunk} from "../common/defaultTypes";
import {authorization} from "../store/thunks/auth";

interface ISignInForm {
   [key: string]: string
}

const connector = connect(
    null,
    (dispatch: Thunk) => ({
        login(data) {
            dispatch(authorization('signin', data))
        }
    })
)

function SignIn({login}: ConnectedProps<typeof connector>) {
  return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values: ISignInForm) => {
            login(values);
        }}
        validationSchema = {
            Yup.object().shape({
              email: Yup.string()
                .required('Required!')
                .email('Incorrect email!'),
              password: Yup.string()
                .min(6, 'Too Short!')
                .required('Required!')
            })
        }
      >
        <Form>
          <Field name="email" placeholder="Email" component={Input} />
          <Field name="password" type="password" placeholder="Password" component={Input}/>
          <div className="form-group row">
              <div className="col text-left pl-3">
                  <Link to="/auth/signup">Sign up</Link>
              </div>
              <div className="col text-right">
                  <button type="submit" className="btn btn-outline-success">Sign in</button>
              </div>
          </div>
        </Form>
      </Formik>
  )
}

export default connector(SignIn);
