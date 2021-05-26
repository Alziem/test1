import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, FormItem, SubmitButton, Form } from "formik-antd";
import { updatePassword } from "./actions";

const Settings = (props) => {
  const [loading, isLoading] = useState(false);

  const initialValues = { password: "", confirmPassword: "" };

  const validateSchema = () =>
    Yup.object({
      password: Yup.string().min(8, "Password Must Be 8 Chars").required(),
      confirmPassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )
      })
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    isLoading(true);

    if (updatePassword(values)) {
        
      resetForm({});

      isLoading(false);
    }
  };
  return (
    <Fragment>
      <section className="add">
        <div className="container">
          <div className="mx-auto ">
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              onSubmit={submitForm}
            >
              {(formik) => (
                <Form>
                  <div className="setting-details border-0">
                    <div className="form-content">
                      <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <FormItem
                          name="password"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                          />
                        </FormItem>
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirm">Confirm Password *</label>
                        <FormItem
                          name="confirmPassword"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            id="confirm"
                            placeholder="Confirm Password"
                          />
                        </FormItem>
                      </div>

                      <div className="text-center">
                        <SubmitButton
                          name="push"
                          className="btn"
                          loading={loading}
                          disabled={false}
                        >
                          Update Password
                        </SubmitButton>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Settings;
