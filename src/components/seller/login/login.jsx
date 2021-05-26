import React from "react";
import { Formik } from "formik";
import { Input, Form, FormItem, SubmitButton } from "formik-antd";
import LoginForm from "../../../services/login";
import {withRouter} from 'react-router'
import * as Yup from "yup";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Login = (props) => {
  
  const initialValue = { email: "seller@gmail.com", password: "12345678" };

  const validateSchema = () =>
    Yup.object({
      email: Yup.string().email().min(5).required(),
      password: Yup.string().required(),
    });

  const submitForm = (values, { setSubmitting }) => {

    setSubmitting(false);

    LoginForm(values).then(res => {

      if(res.status){

        localStorage.setItem('token',res.data.token);

        props.history.push('dashboard');
      }
    })

  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={submitForm}
      validationSchema={validateSchema}
    >
      {(formik) => (
        <div className="container">
          <Form {...layout} className="form-login">
            <div className="col-md-9 col-12">
              <div className="form-content">
                
                <div className="form-group">
                  <FormItem
                    name="email"
                    hasFeedback={true}
                    showValidateSuccess={true}
                  >
                    <Input
                      name="email"
                      placeholder="seller@gmail.com"
                      className="w-100 col-md-12"
                    />
                  </FormItem>
                </div>

                <div className="form-group">
                  <FormItem
                    name="password"
                    hasFeedback={true}
                    showValidateSuccess={true}
                  >
                    <Input.Password
                      name="password"
                      placeholder="12345678"
                      className="w-100 col-md-12"
                    />
                  </FormItem>
                </div>
                
                <SubmitButton
                  name="push"
                  className="btn text-center"
                  disabled={false}
                >
                  Login
                </SubmitButton>

              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default withRouter(Login);
