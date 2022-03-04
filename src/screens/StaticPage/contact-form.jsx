import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import CustomButton from "../../components/widgets/Button";
import { CONTACT_DETAILS } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import ApiRequest from "../../util/ApiRequest";
import Toaster from "../../util/Toaster";
import { useDispatch, useSelector } from "react-redux";

const ContactForm = (props) => {
  const {contactListDetails, setContactListDetails, setContactOpen} = props;
  const dispatch = useDispatch();
  //Data
  const initialValues = {
    first_name: "",
    last_name: "",
    company: "",
    subject: "",
    email: "",
    message:""
  };

  //validation schema
  let validationSchema = Yup.object().shape({
    first_name: Yup.string().required("The field is Required"),
    company: Yup.string().required("The field is Required"),
    subject: Yup.string().required("The field is Required"),
    email: Yup.string().email("Invalid email").required("The field is Required"),
  });
  
  //Form Submission
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(loadingStart());

    const contactDetails = {
      first_name: values.first_name,
      last_name: values.last_name,
      company: values.company,
      subject: values.subject,
      email: values.email,
      message: values.message,
    };
    ApiRequest.request(CONTACT_DETAILS, "POST", contactDetails).then((res) => {
      if (res) {
        setContactListDetails(res);
        setContactOpen(true)
      } else {
        Toaster.error(res?.detail?.message, "topCenter");
      }
      
    });
    dispatch(loadingStop());
    resetForm();
    setTimeout(
      () =>  setContactListDetails(''), 
      5000
    );
  };


  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form className="gridstyle">
                  {/* <CardContent> */}
                  <Grid item container spacing={1}>
                    <Grid item xs={12} sm={5} md={5}>
                      <Field
                        label="First Name*"
                        variant="outlined"
                        fullWidth
                        name="first_name"
                        type="text"
                        value={values.first_name}
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      <Field
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        name="last_name"
                        type="text"
                        value={values?.last_name}
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>

                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="Company*"
                        variant="outlined"
                        fullWidth
                        name="company"
                        type="text"
                        value={values?.company}
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>

                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="Email*"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={values?.email}
                        type="email"
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="Subject*"
                        variant="outlined"
                        fullWidth
                        name="subject"
                        value={values?.subject}
                        type="text"
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="What are you interested in ?"
                        variant="outlined"
                        fullWidth
                        name="message"
                        value={values?.message}
                        type="text"
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                      <div className="form-button-grop">
                        <CustomButton
                          // disabled={!dirty || !isValid}
                          variant="contained"
                          className={
                            "primary-button login__button"
                          }
                          type="Submit"
                        >
                          Submit
                        </CustomButton>
                      </div>
                    </Grid>
                  </Grid>
                 
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
