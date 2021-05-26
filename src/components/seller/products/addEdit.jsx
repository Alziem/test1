import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouteMatch } from "react-router-dom";
import {
  Form as FormFormik,
  InputNumber,
  SubmitButton,
  Select,
  FormItem,
  Input,
} from "formik-antd";
import { Formik } from "formik";
import ImageUploader from "react-images-upload";
import { validationImage } from "../../common/validationImage";
import { validationDesc } from "../../common/validationDesc";
import { Create, Update, Fetch } from "../../common/actions";
import * as Yup from "yup";

const { Option } = Select;

const AddEdit = (props) => {
  const [active, setActive] = useState(false);
  const [category, setCategory] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [tag, setTag] = useState([]);
  const [desc, setDesc] = useState(props.data ? props.data.descri : null);
  const [loading, isLoading] = useState(false);
  const [picture, setPicture] = useState([]);

  const Router = useRouteMatch();

  const ROUTER_VIEW = Router.path !== "/dashboard/product/:slug" ? true : false;

  useEffect(() => {
    Fetch("carousel").then((res) => {
      if (res.status) {
        setCarousel(res.data);
      }
    });
    Fetch("tag").then((res) => {
      if (res.status) {
        setTag(res.data);
      }
    });

    Fetch("subcategory").then((res) => {
      if (res.status) {
        setCategory(res.data);
      }
    });
  }, []);

  const validateSchema = () =>
    Yup.object({
      title: Yup.string().max(60).required(),
      subtitle: Yup.string().max(200).required(),
      price: Yup.number().required().positive().integer(),
      discount: Yup.number().required().positive().integer(),
      count: Yup.number().required().positive().integer(),
      m_neg: Yup.number().required().positive().integer(),
      category: Yup.number().positive().integer().nullable(),
      carousel: Yup.number().positive().integer().nullable(),
      tag: Yup.number().positive().integer().nullable(),
    });

  const onDrop = (initial, pictureDataURLs) => {
    setPicture(initial); // or pictureDataURLs
  };

  const params = useParams();

  const submitForm = (values, { setSubmitting, resetForm }) => {

    setSubmitting(false);

    if (validationDesc(desc) && validationImage(picture, props.edit)) {

      isLoading(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {

        formData.append(key, values[key]);

      });

      formData.append("descri", desc);

      formData.append("image", picture[0]);

      if (props.edit) {
        
        const id = params.slug;

        if (Update("product", formData, id)) {

          resetForm({});


          isLoading(false);
        }
      } else {
        if (Create("product", formData)) {

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
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <FormFormik>
              <div className="information-details">
                <div className="row">
                  <div className="col-md-3 col-12">
                    <div className="information">
                      <h3>Information English</h3>
                      <ul>
                        <li>
                          Add basic information about the product and author
                          name.
                        </li>
                        <li>Change information about your product.</li>
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
                            autoFocus
                            placeholder="e.g. 'Advanced Photoshop Techniques' or 'Watercolors for Dummies'"
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
                            id="subtitle"
                            className="form-control"
                            placeholder="e.g. 'Everything you need to know about video editing'"
                          />
                        </FormItem>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="price">Price *</label>

                              <FormItem
                                name="price"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.price : null
                                  }
                                  name="price"
                                  id="price"
                                  placeholder="Price Value"
                                  formatter={(value) =>
                                    `SAR ${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )
                                  }
                                  step="number"
                                  parser={(value) =>
                                    value.replace(/\SAR\s?|(,*)/g, "")
                                  }
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="discount">Discount *</label>
                              <FormItem
                                name="discount"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.discount : null
                                  }
                                  name="discount"
                                  id="discount"
                                  placeholder="Price Value"
                                  formatter={(value) =>
                                    `SAR ${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )
                                  }
                                  step="number"
                                  parser={(value) =>
                                    value.replace(/\SAR\s?|(,*)/g, "")
                                  }
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="count">Count *</label>
                              <FormItem
                                name="count"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.count : null
                                  }
                                  name="count"
                                  id="count"
                                  max={1000}
                                  placeholder="Count Value"
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="m_neg">Max Negotiate *</label>
                              <FormItem
                                name="m_neg"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.max_neg : null
                                  }
                                  name="m_neg"
                                  id="m_neg"
                                  min={0}
                                  max={100}
                                  placeholder="Max Negotiate Value"
                                  formatter={(value) => `${value}%`}
                                  parser={(value) => value.replace("%", "")}
                                />
                              </FormItem>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label htmlFor="category">Category *</label>
                            <Select
                              defaultValue={
                                props.edit && props.data.category_id != null
                                  ? props.data.category_id
                                  : null
                              }
                              name="category"
                              placeholder="Category"
                            >
                              {category.map((index, key) => {
                                return (
                                  <Option key={key} value={index.id}>
                                    {index.name_en || index.name_ar}
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>

                          <div className="col-md-4 col-12">
                            <label htmlFor="carousel">Carousel *</label>
                            <Select
                              defaultValue={
                                props.edit && props.data.carousel_id != null
                                  ? props.data.carousel_id
                                  : null
                              }
                              name="carousel"
                              placeholder="Carousel"
                            >
                              {carousel.map((index, key) => {
                                return (
                                  <Option key={key} value={index.id}>
                                    {index.title}
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>

                          <div className="col-md-4 col-12">
                            <label htmlFor="tag">Tag *</label>
                            <Select
                              defaultValue={
                                props.edit && props.data.tag_id != null
                                  ? props.data.tag_id
                                  : null
                              }
                              name="tag"
                              placeholder="Tag"
                            >
                              {tag.map((index, key) => {
                                return (
                                  <Option key={key} value={index.id}>
                                    {index.title}
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="descri_content">
                        <div
                          className="head"
                          onClick={() => setActive(!active)}
                        >
                          <span>Product Description</span>
                          <span>
                            <i className="fa fa-angle-down icon-arrow-down"></i>
                          </span>
                        </div>

                        <div className={`content ${active ? "active" : ""}`}>
                          <div className="container_content">
                            <CKEditor
                              id="description"
                              editor={ClassicEditor}
                              config={{
                                toolbar: ["Bold", "Italic", "Undo", "Redo"],
                              }}
                              data={props.data ? props.data.descri : ""}
                              onChange={(event, editor) => {
                                const dataEditor = editor.getData();
                                setDesc(dataEditor);
                                if (!isLoading) {
                                  editor.setData("");
                                }
                              }}
                            />
                          </div>
                        </div>
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
                          Brand your product by setting a custom thumbnail
                          image. You can set different images to use on the iOS
                          app (as different dimensions are recommended).
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
                    {props.edit ? "Edit Product" : "Add Product"}
                  </SubmitButton>
                </div>
              ) : null}
            </FormFormik>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withRouter(AddEdit);
