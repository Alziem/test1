import React, { useState } from "react";
import { withRouter } from "react-router";
import {useParams,useRouteMatch} from 'react-router-dom'
import {Form, Input, FormItem,SubmitButton} from 'formik-antd'
import { Formik} from "formik";
import ImageUploader from "react-images-upload";
import {Create,Update} from '../../common/actions'
import {validationImage} from '../../common/validationImage'

import * as Yup from "yup";

const AddEdit = (props) => {
  
  const [loading, isLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  
  const validationSchema = () =>
    Yup.object({
      title: Yup.string().max(60).required(),
      subtitle: Yup.string().max(200).required(),
    });

  const onDrop = (initial, pictureDataURLs) => {

    setPicture(initial); // or pictureDataURLs
  };

  const params = useParams();


  const Router = useRouteMatch();

  const ROUTER_VIEW = Router.path !== "/dashboard/carousel/:slug" ? true : false;

  const submitForm = (values, { setSubmitting,resetForm }) => {

    setSubmitting(false);

    if (validationImage(picture, props.edit)) {

      isLoading(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {

        formData.append(key, values[key]);

      });

      formData.append("image", picture[0]);

      if (props.edit) {
        
        const id = params.slug;

        if (Update("carousel", formData, id)) {

          resetForm({});

          isLoading(false);
        }
      } else {

        if (Create("carousel", formData)) {

          resetForm({});

          isLoading(false);
        }
      }
    }
  
  };

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
              <div className="information-details">
                <div className="row">
                  <div className="col-md-3 col-12">
                    <div className="information">
                      <h3>Information English</h3>
                      <ul>
                        <li>
                          Add basic information about the carousel and author
                          name.
                        </li>
                        <li>Change information about your carousel.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9 col-12">
                    <div className="form-content">
                      <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <FormItem
                        name="title"
                        hasFeedback={true}
                        showValidateSuccess={true}
                        >
                          <Input
                          type="text"
                          name="title"
                          className="form-control"
                          id="title"
                          placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'"
                          autoFocus
                        />
                        </FormItem>
                      </div>

                      <div className="form-group">
                        <label htmlFor="subtitle">Subtitle *</label>
                        <FormItem
                        name="subtitle"
                        hasFeedback={true}
                        showValidateSuccess={true}
                        >
                          <Input
                          type="text"
                          name="subtitle"
                          className="form-control"
                          id="title"
                          placeholder="e.g. 'Everything you need to know about video editing'"
                          />
                        </FormItem>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="information-branding">
                <div className="row border-0">
                  <div className="col-md-3 col-12">
                    <div className="information">
                      <h3>Branding</h3>
                      <ul>
                        <li>
                          Brand your carousel by setting a custom thumbnail image.
                          You can set different images to use on the iOS app (as
                          different dimensions are recommended).
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9 col-12">
                    <div className="branding-right">
                      <div className="branding-image">
                        <div className="row border-0">
                          <div className="col-md-8 col-lg-9">
                            <div className="image-container">
                            {ROUTER_VIEW ? (
                                <ImageUploader
                                  withIcon={true}
                                  withPreview={true}
                                  buttonText="Choose images"
                                  onChange={onDrop}
                                  singleImage={true}
                                  imgExtension={[".jpg", ".png"]}
                                  maxFileSize={5242880}
                                />
                              ) : (
                                <img
                                  src={props.data.image}
                                  className="uploadPicture"
                                  alt="preview"
                                />
                              )}
                            </div>
                          </div>

                          <div className="col-md-4 col-lg-3">
                            <div className="image-details">
                              <div className="half_opaque">
                                <span className="text-center">
                                  Recommended
                                  <br />
                                  format
                                </span>

                                <ul>
                                  <li>JPG, PNG</li>
                                  <li>960x540px</li>
                                </ul>
                              </div>

                              {ROUTER_VIEW ? (
                                props.data ? (
                                  <div className="uploadPictureContainer">
                                    <img
                                      src={props.data.image}
                                      className="uploadPicture"
                                      alt="preview"
                                    />
                                  </div>
                                ) : null
                              ) : null}

                            </div>
                          </div>
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
                    loading={loading}
                    disabled={false}
                  >
                    {props.edit ? "Edit Carousel" : "Add Carousel"}
                  </SubmitButton>
                </div>
              ) : null}

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withRouter(AddEdit);
