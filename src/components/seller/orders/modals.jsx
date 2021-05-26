import React, { useState } from "react";
import { Modal } from "antd";
import * as Yup from "yup";
import { Create } from "../../common/actions";
import { Formik,  Form, useField } from "formik";
import { DatePicker, TimePicker, Form as FormFormik, Input,FormItem } from "formik-antd";

const MyTextArea = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const SendMessage = (props) => {

  const [loading, isLoading] = useState(false);

  const initialValues = { message: "" };

  const validateSchema = () =>
    Yup.object({
      message: Yup.string().min(5).required(),
    });

  const submitForm = (values, { setSubmitting }) => {

    isLoading(true);

    setSubmitting(false);

    values.id = props.dataIndex;

    if (Create("message", values)) {

      isLoading(false);

      setTimeout(() => {

        props.handlingProps(false);

      },15);
    }
  };

  return (
    <div className="modal-container d-none">
      <Modal
        title={props.title}
        visible={props.visible}
        confirmLoading={loading}
        onCancel={props.onCancel}
        okButtonProps={{
          htmlType: "submit",
          key: "submit",
          string: "Send",
          form: `send-message${props.dataIndex}`,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit} id={`send-message${props.dataIndex}`}>
              <div className="group-input">
                <MyTextArea
                  name="message"
                  className="w-100"
                  rows="6"
                  placeholder="Write Message"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export const CreateMeeting = (props) => {

  const [loading, isLoading] = useState(false);

  const initialValues = {
    topic: "",
    start: "",
    duration: "",
    agenda: "",
  };

  const validateSchema = () =>
    Yup.object({
      topic: Yup.string().min(5).required(),
      start: Yup.date().required(),
      agenda: Yup.string().nullable(),
      duration: Yup.string().required(),
    });

  const submitForm = (values, { setSubmitting,resetForm }) => {

    isLoading(true);

    setSubmitting(false);

    values.id = props.dataIndex;

    if (Create("meeting", values)) {
      
      isLoading(false);

      resetForm({});
      
      setTimeout(() => {
        props.handlingProps(false)
      },15);
    }
    
  };

  return (
    <div className="modal-container d-none">
      <Modal
        title={props.title}
        visible={props.visible}
        confirmLoading={loading}
        onCancel={props.onCancel}
        okButtonProps={{
          htmlType: "submit",
          key: "submit",
          form: `create-meeting${props.dataIndex}`,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
          render={formik => 
            (
              <FormFormik
              id={`create-meeting${props.dataIndex}`}
            >
              <div className="group-input">
              <FormItem
                  name="topic"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <Input name="topic" placeholder="Enter Topic" />
              </FormItem>
              </div>

              <div className="group-input">
                <FormItem
                  name="duration"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <TimePicker 
                    name="duration"
                    placeholder="Duration Meeting" 
                   />
                </FormItem>
              </div>

              <div className="group-input">
                <FormItem
                  name="start"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <DatePicker
                    name="start"
                    // showTime={true}
                    placeholder="Start Meeting"
                  />
                </FormItem>
              </div>

              <div className="group-input">
                <FormItem
                  name="agenda"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <Input name="agenda" placeholder="Enter Agenda (optional)" />
                </FormItem>
              </div>
              
            </FormFormik>
            )
          }
        />
      </Modal>
    </div>
  );
};
