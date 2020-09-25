import React from "react";
import ReactDOM from "react-dom";
import { Formik, useField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Agile Ortho</h1>
      <h3>Doctor Registration Form</h3>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          speciality: "", // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          speciality: Yup.string()
            .oneOf(
              [
                "shoulder",
                "elbow",
                "handandwrist",
                "hipandthigh",
                "footandankle",
                ,
                "other",
              ],
              "Invalid Job Type"
            )
            .required("Required"),
          url: Yup.string().url("Invalid URL."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Alok"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Kattangoori"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="alok@agileortho.co.in"
          />
          <MyTextInput
            label="Website"
            name="url"
            type="url"
            placeholder="www.agileortho.in/"
          />

          <MySelect label="Speciality" name="speciality">
            <option value="">Select a speciality</option>
            <option value="shoulder">Shoulder</option>
            <option value="elbow">Elbow</option>
            <option value="handandwrist">Hand and Wrist</option>
            <option value="hipandthigh">Hip and Thigh</option>
            <option value="footandankle">Foot and Ankle</option>
            <option value="kneeandlowerleg">Knee and Lower Leg</option>
            <option value="spinesurgeon">Spine Surgeon</option>
            <option value="pediatricorthopedics">Pediatric Orthopedics</option>
            <option value="orthopediconcologist">Orthopedic Oncologist</option>
            <option value="complextraumasurgeon">Complex Trauma Surgeon</option>
            <option value="pelvicandacetabularsurgeon">
              Pelvic and Acetabular surgeon
            </option>
            <option value="other">Other</option>
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
