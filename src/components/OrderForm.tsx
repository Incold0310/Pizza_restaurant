import React from 'react';
import {Formik, Form, Field} from 'formik';
import Input from './form_elements/Input';
import AutocompleteAddressInput from './form_elements/AutocompleteAddressInput';
import Checkbox from './form_elements/Checkbox';
import * as Yup from 'yup';
import {connect, ConnectedProps} from 'react-redux';
import {sendOrder} from "../store/thunks/sendOrder";
import {Thunk} from "../common/defaultTypes";
import {Alert} from "react-bootstrap";
import {RootState} from "../store/reducers/rootReducer";
import {closeOrderAlert} from "../store/actions/alert";


export interface OrderFormValues {
    name: string
    email: string
    address: string,
    phone: string | number,
    sendEmailResponse: boolean
}

const connector = connect(
    (state: RootState) => ({
        style: state.basket.orderStatus.style,
        text: state.basket.orderStatus.text
    }),
    (dispatch: Thunk) => ({
        sendUserOrder(form: OrderFormValues) {
            dispatch(sendOrder(form))
        },
        close() {
            dispatch(closeOrderAlert())
        }
    })
)

function OrderForm(props: ConnectedProps<typeof connector>) {
  return (
      <Formik
        initialValues={{ name: '', email: '', address: '', phone: '', sendEmailResponse: false }}
        onSubmit={(values: OrderFormValues) => {
          props.sendUserOrder(values);
        }}
        validationSchema = {
            Yup.object().shape({
              name: Yup.string()
                .required('Required!'),
              email: Yup.string()
                .email('Incorrect email!'),
              phone: Yup.string()
                  .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7}$/, 'Incorrect phone')
                  .required('Required!'),
              address: Yup.string()
                .required('Required!'),
            })
        }
      >
        <Form>
            {
                props.text && props.style &&
                    <Alert variant={props.style} onClose={props.close} dismissible>{props.text}</Alert>
            }
            <Field name="name" placeholder="Your name" component={Input} />
            <Field name="phone" placeholder="Your phone" component={Input} />
            <Field name="address" placeholder="Address" component={AutocompleteAddressInput}/>
            <div className="row p-0">
                <div className="col-12">
                    <Field name="email" placeholder="Your email" component={Input}/>
                </div>
                <div className="col-12">
                    <Field name="sendEmailResponse" component={Checkbox} labelText="Send an email with order information" />
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-outline-success">Order a pizza</button>
            </div>
        </Form>
      </Formik>
  )
}

export default connector(OrderForm);
