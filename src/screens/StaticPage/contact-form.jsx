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
//Data
const initialValues = {
  firstName: "",
  lastName: "",
  company: "",
  Subject: "",
  email: "",
};

//validation schema
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const ContactForm = () => {
  const onSubmit = (values) => {
    console.log(values);
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
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                        value={values.firstName}
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                      <Field
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        name="lastName"
                        value={values.lastName}
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>

                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="Company"
                        variant="outlined"
                        fullWidth
                        name="company"
                        value={values.company}
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>

                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={values.email}
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        name="Subject"
                        value={values.Subject}
                        type="Subject"
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                      <Field
                        label="What are you interested in ?"
                        variant="outlined"
                        fullWidth
                        name="interest"
                        value={values.interest}
                        type="interest"
                        component={TextField}
                        className="gridstyle__field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                      <div className="form-button-grop">
                        <CustomButton
                          disabled={!dirty || !isValid}
                          variant="contained"
                          className={
                            !dirty || !isValid
                              ? "secondary-button login__button"
                              : "primary-button login__button"
                          }
                          type="Submit"
                        >
                          Submit
                        </CustomButton>
                      </div>
                    </Grid>
                  </Grid>
                  {/* </CardContent> */}
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
