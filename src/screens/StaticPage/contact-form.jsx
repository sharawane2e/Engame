import React from "react"
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from "@material-ui/core"

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"

const useStyle = makeStyles((theme) => ({
  padding: {
    // padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

//Data
const initialValues = {
  firstName: "",
  lastName: "",
  company: "",
  Subject: "",
  email: "",
}


//validation schema
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string().email("Invalid email").required("Required"),
})

const ContactForm = () => {
  const classes = useStyle()

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={12}>
        <Card className={classes.padding}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          name="firstName"
                          value={values.firstName}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          name="lastName"
                          value={values.lastName}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={12}>
                      <Field
                          label="Company"
                          variant="outlined"
                          fullWidth
                          name="company"
                          value={values.company}
                          component={TextField}
                        />
                      </Grid>
                     
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values.email}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label="Subject"
                          variant="outlined"
                          fullWidth
                          name="Subject"
                          value={values.Subject}
                          type="Subject"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label="What are you interested in ?"
                          variant="outlined"
                          fullWidth
                          name="interest"
                          value={values.interest}
                          type="interest"
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}>
                      Submit
                    </Button>
                  </CardActions>
                </Form>
              )
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContactForm
