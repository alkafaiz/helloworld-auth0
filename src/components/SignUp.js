import React from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback
} from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import auth from "../services/auth0";

function SignUp() {
  const handleSubmit = values => {
    const { username, email, password } = values;
    console.log("values");

    const response = new auth().signup(email, password, username);
    debugger;
  };

  const isError = (formik, name) =>
    formik.touched[name] && formik.errors[name] ? true : false;

  return (
    <Container className="mb-5">
      <Row>
        <Col xl={{ size: 4, offset: 4 }}>
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              email: "",
              firstName: "",
              lastName: "",
              country: ""
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required("Required")
                .min(8, "Must have at least 8 characters")
                .max(20, "Must have 20 characters or less"),
              password: Yup.string()
                .required("Required")
                .min(8, "Must have at least 8 characters")
                .matches(
                  /^(?=.*[a-z])/,
                  "Must have at least 1 lowercase character"
                )
                .matches(
                  /^(?=.*[A-Z])/,
                  "Must have at least 1 uppercase character"
                )
                .matches(/[!@#$%^&]/, "Must have at least 1 special character")
                .matches(/^(?=.*[0-9])/, "Must have at least 1 number"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required")
            })}
            onSubmit={handleSubmit}
          >
            {formik => (
              <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Label for="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    {...formik.getFieldProps("firstName")}
                    invalid={isError(formik, "firstName")}
                  />
                  <FormFeedback>
                    {ErrorMessage({ name: "firstName" })}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    {...formik.getFieldProps("lastName")}
                    invalid={isError(formik, "lastName")}
                  />
                  <FormFeedback>
                    {ErrorMessage({ name: "lastName" })}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                    {...formik.getFieldProps("email")}
                    invalid={isError(formik, "email")}
                  />
                  <FormFeedback>{ErrorMessage({ name: "email" })}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                    invalid={isError(formik, "username")}
                  />
                  <FormFeedback>
                    {ErrorMessage({ name: "username" })}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Create new password"
                    {...formik.getFieldProps("password")}
                    invalid={isError(formik, "password")}
                  />
                  <FormFeedback>
                    {ErrorMessage({ name: "password" })}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    {...formik.getFieldProps("confirmPassword")}
                    invalid={isError(formik, "confirmPassword")}
                  />
                  <FormFeedback>
                    {ErrorMessage({ name: "confirmPassword" })}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Input
                    type="select"
                    id="country"
                    {...formik.getFieldProps("country")}
                    invalid={isError(formik, "country")}
                  >
                    <option>Malaysia</option>
                    <option>Indonesia</option>
                    <option>Singapore</option>
                    <option>Thailand</option>
                    <option>Philiphines</option>
                  </Input>
                  <FormFeedback>
                    {ErrorMessage({ name: "country" })}
                  </FormFeedback>
                </FormGroup>

                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
