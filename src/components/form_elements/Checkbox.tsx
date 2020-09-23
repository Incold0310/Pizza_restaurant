import React from 'react';
import {ErrorMessage, FieldProps} from 'formik';

function Checkbox({field, form:{ touched, errors }, labelText, ...props}: FieldProps & {labelText: string}) {
  const error = errors[field.name] && touched[field.name] ? errors[field.name] : '';
  return (
    <div className="d-flex align-items-center">
      <input className={`mr-3 ${error ? 'is-invalid' : ''}`}
             aria-describedby={`sm${field.name}`}
             type="checkbox"
             checked={field.value}
             id={field.name}
             {...props}
             {...field}
      />
      <label className="form-check-label" htmlFor={field.name}>
          {labelText}
      </label>
      <ErrorMessage name={field.name} component="small" className="invalid-feedback mb-3" />
    </div>
  )
}


export default Checkbox;
