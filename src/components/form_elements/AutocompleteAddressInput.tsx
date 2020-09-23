import React, {useEffect, useRef} from 'react';
import {ErrorMessage, FieldProps} from 'formik';

function AutocompleteAddressInput({field, form , ...props }: FieldProps) {

  let autocomplete = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    autocomplete.current = new (window as any).google.maps.places.Autocomplete(autocomplete.current, {
      'types': ['address'],
      'language': 'en-GB'
    });
    // @ts-ignore
    autocomplete.current.addListener('place_changed', setValue);
  }, [])

  const setValue = () => {
    // @ts-ignore
    let address = autocomplete.current.getPlace().formatted_address;
    form.setFieldValue(field.name, address, false);
  }

  const error = form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : '';

  return (
      <div>
        <input className={`form-control ${error ? 'mb-1 is-invalid' : 'mb-3'}`}
               aria-describedby={`sm${field.name}`}
               ref={autocomplete}
               {...props}
               {...field}
        />
        <ErrorMessage name={field.name} component="small" className="invalid-feedback mb-3" />
      </div>
  )
}

// @ts-ignore
export default AutocompleteAddressInput;
