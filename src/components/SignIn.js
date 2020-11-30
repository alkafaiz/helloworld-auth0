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

function SignIn() {
  const handleSubmit = values => {
    const { username, password } = values;
    console.log(values);

    const response = new auth().login(username, password);
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
              password: ""
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required("Required")
                .min(8, "Must have at least 8 characters")
                .max(20, "Must have 20 characters or less"),
              password: Yup.string().required("Required")
            })}
            onSubmit={handleSubmit}
          >
            {formik => (
              <Form onSubmit={formik.handleSubmit}>
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
                <Button color="primary" type="submit">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
