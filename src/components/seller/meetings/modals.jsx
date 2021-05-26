import React, { useState } from "react";
import { Modal,Button } from "antd";
import * as Yup from "yup";
import { Update } from "../../common/actions";
import { Formik } from "formik";
import { DatePicker, TimePicker, Form as FormFormik, Input,FormItem } from "formik-antd";


export const ViewMeeting = (props) => {

  return (
    <div className="modal-container d-none">
      <Modal
        title={props.title}
        visible={props.visible}
        onOk={() => props.handlingProps()}
        onCancel={props.onCancel}
      >
        <div className="text-center meeting-content">
          <div className="meeting-path">{(props.data.tableData[props.data.rowIndex].topic)}</div>
          <Button>
            <a href={(props.data.tableData[props.data.rowIndex].start_url)} target="_blank" rel="noreferrer">Start Meeting</a>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export const EditMeeting = (props) => {

  const [loading, isLoading] = useState(false);

  const initialValues = {
    topic: props.data[1],
    start: props.data[4],
    duration: props.data[2],
    agenda: props.data[6],
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

    if (Update("meeting", values,props.dataIndex)) {
      
      isLoading(false);

      resetForm({});
      
      setTimeout(() => {

        props.handlingProps(false)

      },25);
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
          form: `update-meeting${props.dataIndex}`,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {formik => 
            (
              <FormFormik
              id={`update-meeting${props.dataIndex}`}
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
        </Formik>
      </Modal>
    </div>
  );
};