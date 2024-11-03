import { Field, ErrorMessage } from "formik";
// Input Field Component With Error Message and Label
// Props: name (id, name), label (Title of the input field)
// inputType: is the value of [as] arg in Field component which is the type of element will appear in the browser
// ...props: to add any args to this element depending on what it is.
const InputField = ({ children, name, label, inputType, ...props }) => {
  return (
    <div>
      <label className="mb-2 mt-2 text-light" htmlFor={name}>
        {label}
      </label>
      <Field
        as={inputType}
        {...props}
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          outline: "none",
          height: "52px",
        }}
        id={name}
        name={name}
      >
        {children}
      </Field>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default InputField;
