import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import Input from './form_elements/Input';
import * as Yup from 'yup';
import {Link} from  "react-router-dom";
import {Thunk} from "../common/defaultTypes";
import {authorization} from "../store/thunks/auth";

interface ISignUpForm {
    [key: string]: string
}

const connector = connect(
    null,
    (dispatch: Thunk) => ({
        login(data) {
            dispatch(authorization('signup', data))
        }
    })
)

function SignUp({login}: ConnectedProps<typeof connector>) {
    return (
      <Formik
        initialValues={{name:'', surname:'', email:'', password:'', confirmPassword:'' }}
        onSubmit={(values: ISignUpForm) => {
            login(values);
        }}
        validationSchema = {
            Yup.object({
              name: Yup.string()
                .required('Required!'),
              surname: Yup.string()
                .required('Required!'),
              email: Yup.string()
                .email('Enter a valid email!')
                .required('Required!'),
              password: Yup.string('')
                .required('Required!')
                .test('validPass', 'Password must not contain Cyrillic and punctuation marks!',
                  value => {
                    const regexp = /[\s\p{sc=Cyrillic}.><,:;()+="'`[\]{}\/\\]/u;
                    return regexp.test(value) ? false : true;
                  }
                )
                .min(6, 'Password must be at least 6 symbols long!'),
              confirmPassword: Yup.string('')
                .required('Required!')
                .oneOf([Yup.ref('password')], 'Password does not match')
            })
        }
      >
        <Form>
          <div className="form-row">
            <div className="col">
              <Field name="name" placeholder="Your name" component={Input} />
            </div>
            <div className="col">
              <Field name="surname" placeholder="Your surname" component={Input} />
            </div>
          </div>
          <Field name="email" placeholder="Email" component={Input} />
          <Field name="password" type="password" placeholder="Password" component={Input}/>
          <Field name="confirmPassword" type="password" placeholder="Confirm your password" component={Input}/>
          <div className="form-group row">
              <div className="col text-left pl-3">
                  <Link to="/auth/signin">Sign in</Link>
              </div>
              <div className="col text-right">
                  <button type="submit" className="btn btn-outline-success">Sign up</button>
              </div>
          </div>
        </Form>
      </Formik>
  )
}

export default connector(SignUp);
