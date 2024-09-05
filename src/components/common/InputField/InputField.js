import { Field, ErrorMessage } from "formik";

// Input Field Component With Error Message and Label
// Props: name (id, name), label (Title of the input field)
const InputField = ({ name, label }) => {
  return (
    <div>
      <label className="mb-1" htmlFor={name}>
        {label}
      </label>
      <Field
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          outline: "none",
        }}
        id={name}
        name={name}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default InputField;
