import React from 'react';
import {ErrorMessage, FieldProps} from 'formik';

function Input({field, form:{ touched, errors}, withIcon = false, ...props}: FieldProps & {withIcon?: boolean}) {
  const error = errors[field.name] && touched[field.name] ? errors[field.name] : '';
    //${withIcon && touched && field.value ? 'correctValue' : ''}
  return (
    <div>
        <input className={`form-control ${error ? 'mb-1 is-invalid' : 'mb-3'}`}
             aria-describedby={`sm${field.name}`}
             {...props}
             {...field}
        />
        <ErrorMessage name={field.name} component="small" className="invalid-feedback mb-3" />
        {
            withIcon && !error && <i className="fa fa-check"></i>
        }
    </div>
  )
}


export default Input;
