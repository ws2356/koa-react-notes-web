import React, { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  TextInput,
  SubmitButton,
} from "@/components/partials/forms/inputs/Inputs";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { reset } from "@/store/user/actions";
import {
  UserResetPost,
  UserResetPostWithPasswordConfirm,
  UserResetPostWithPasswordConfirmValidation,
} from "@/store/user/api";
import { UserThunkDispatch } from "@/store/user/types";
import { ServerError } from "@/common/api";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const initialDefaultValues: UserResetPostWithPasswordConfirm = {
  passwordResetToken: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const ResetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const dispatch = useDispatch<UserThunkDispatch>();
  // const wow = useParams();
  // console.log(wow);
  // const { passwordResetToken, email } = useQuery();
  // eslint-disable-next-line prefer-const
  let query = useQuery();

  // const initialDefaultValues: UserResetPost {
  //   passwordResetToken: "",
  //   email: "",
  //   password: "123123123",
  //   passwordConfirm: "123123123",
  // }

  const [defaultValues, setDefaultValues] = useState<
    UserResetPostWithPasswordConfirm
  >(initialDefaultValues);

  const passwordResetToken = query.get("passwordResetToken");
  const email = query.get("email")?.replace(" ", "+");

  useEffect(() => {
    if (passwordResetToken != null && email != null) {
      setDefaultValues({
        passwordResetToken,
        email,
        password: "",
        passwordConfirm: "",
      });
    }
  }, [email, passwordResetToken]);

  const handleSubmit = async (
    values: UserResetPostWithPasswordConfirm,
    actions: FormikHelpers<UserResetPostWithPasswordConfirm>,
  ) => {
    try {
      setIsLoading(true);
      const { passwordConfirm, ...valuesNoPasswordConfirm } = values;
      const convertedValues: UserResetPost = { ...valuesNoPasswordConfirm };
      await dispatch(reset(convertedValues));

      // Clear inputs
      actions.resetForm();

      // Push to dashboard
      history.push("/");

      addToast("Password Reset. Please login.", { appearance: "success" });
    } catch (error) {
      const e = error as ServerError;
      if (e && (e.error || e.errors)) {
        //
      }

      addToast(
        "Hmm, your reset link is no longer valid. Please create a new reset link and try again.",
        {
          appearance: "error",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container className="py-4">
        <Formik
          initialValues={defaultValues}
          onSubmit={handleSubmit}
          validationSchema={UserResetPostWithPasswordConfirmValidation}
          enableReinitialize
        >
          <Form>
            <Row className="justify-content-center">
              <Col lg={6}>
                <h1>Reset</h1>
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput name="password" type="password" label="Password" />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <TextInput
                  name="passwordConfirm"
                  type="password"
                  label="Confirm Password"
                />
              </Col>

              <div className="w-100" />

              <Col lg={6}>
                <SubmitButton
                  name="signup-submit-button"
                  text="Signup"
                  loading={isLoading}
                  loadingText="Signing in ..."
                />
              </Col>
            </Row>
          </Form>
        </Formik>
      </Container>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Link to="/user/forgot">Login</Link> {" | "}
            <Link to="/user/forgot">Forgot Password</Link> {" | "}
            <Link to="/user/reset">Reset Password</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
