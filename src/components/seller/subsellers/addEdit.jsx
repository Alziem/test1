import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { useRouteMatch } from "react-router-dom";
import Spinner from "../layouts/spinner/spinner";
import ToastHandling from "../../common/toastify";
import { Checkbox } from "antd";
import { Form, Input, FormItem, SubmitButton } from "formik-antd";
import { permissions } from "./actions";
import { Create, Update } from "../../common/actions";
import * as Yup from "yup";

const AddEdit = (props) => {
  const [permission, setPermission] = useState([]);
  const [selectPermission, setSelectPermission] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    permissions().then((res) => setPermission(res));

    setLoading(false);
  }, []);

  const onChange = (event) => {

    setSelectPermission(event);
    
  };

  let validationPassword = props.edit
    ? Yup.string().min(8).nullable()
    : Yup.string().min(8).required();

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().max(60).required(),
      email: Yup.string().email().required(),
      password: validationPassword,
    });

  const params = useParams();

  const Router = useRouteMatch();

  const ROUTER_VIEW =
    Router.path !== "/dashboard/subseller/:slug" ? true : false;

    const handlingChecked = (values) => {

      if(values.length > 0){

        let arrayChecked = [];

        for(let x  of values){

          arrayChecked.push(x.id)

          selectPermission.push(x.id)
        }

        return arrayChecked;
      }

    }

  const submitForm = (values, { setSubmitting, resetForm }) => {

    setSubmitting(false);

    if (selectPermission.length === 0) {

      ToastHandling("error", "Please select at least one permission");

      return false;

    } else {
      setActive(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      Object.keys(selectPermission).forEach((key) => {
        formData.append("permission[]", selectPermission[key]);
      });

      if (props.edit) {
        const id = params.slug;

        if (Update("subseller", formData, id)) {
          setActive(false);
        }
      } else {
        if (Create("subseller", formData)) {
          resetForm({});

          setActive(false);
        }
      }
    }
  };

  if (!loading) {
    return (
      <div className="add">
        <div className="container">
          <Formik
            initialValues={props.initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            {(formik) => (
              <Form>
                <div className="information-details border-0">
                  <div className="row">
                    <div className="col-md-3 col-12">
                      <div className="information">
                        <h3>Information English</h3>
                        <ul>
                          <li>
                            Add basic information about the seller and seller
                            email.
                          </li>
                          <li>Change information about your seller.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-9 col-12">
                      <div className="form-content">
                        <div className="form-group">
                          <label htmlFor="name">Name *</label>
                          <FormItem
                            name="name"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input
                              type="text"
                              name="name"
                              className="form-control"
                              id="name"
                              placeholder="e.g. 'Mahmoud Abd Alziem'"
                              autoFocus
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">E-Mail *</label>
                          <FormItem
                            name="email"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                              placeholder="e.g. 'mbdalzym376@gmail.com'"
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Password *</label>
                          <FormItem
                            name="password"
                            showValidateSuccess="true"
                            hasFeedback={true}
                          >
                            <Input
                              type="password"
                              name="password"
                              className="form-control"
                              id="password"
                              placeholder="e.g. 'Password'"
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <label>Permissions *</label>
                          <div className="p-container">
                            <Checkbox.Group onChange={onChange} defaultValue={props.edit ? () => handlingChecked(formik.values.permission) : null} name="permission">
                              {permission.map((permi, _id) => {
                                return (
                                  (formik.values.permission && formik.values.permission[_id] && formik.values.permission[_id].id) ? (
                                    (formik.values.permission[_id].id === permi.id) ? (
                                      <span className="p-content" key={_id}>
                                        <Checkbox key={_id} value={permi.id}>
                                          <span className="p-name">
                                            {permi.name_ar || permi.name}
                                          </span>
                                        </Checkbox>
                                      </span> 
                                    ) : (
                                      <span className="p-content" key={_id}>
                                          <Checkbox key={_id} value={permi.id}>
                                            <span className="p-name">
                                              {permi.name_ar || permi.name}
                                            </span>
                                          </Checkbox>
                                        </span>
                                    )
                                  ) : (
                                    <span className="p-content" key={_id}>
                                        <Checkbox key={_id} value={permi.id}>
                                          <span className="p-name">
                                            {permi.name_ar || permi.name}
                                          </span>
                                        </Checkbox>
                                      </span>
                                  )
                                )
                              })}
                            </Checkbox.Group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {ROUTER_VIEW ? (
                  <div className="text-center">
                    <SubmitButton
                      name="push"
                      className="btn"
                      loading={active}
                      disabled={false}
                    >
                      {props.edit ? "Edit Subseller" : "Add Subseller"}
                    </SubmitButton>
                  </div>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default withRouter(AddEdit);
