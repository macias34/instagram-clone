import { ErrorMessage, Field, useFormikContext } from "formik";
import { InputHTMLAttributes } from "react";
import { Input } from "./input";

interface LabeledField {
  name: string;
  label?: string;
  placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}

const LabeledField = ({ name, label, type, placeholder }: LabeledField) => {
  return (
    <>
      <div className="relative flex flex-col gap-2">
        <Field type={type} name={name} as={Input} placeholder={placeholder} />
      </div>
      {/* <span className="my-1 text-xs font-normal text-red-500"> */}
      <ErrorMessage
        className="text-xs font-normal text-red-500"
        component="span"
        name={name}
      />
      {/* </span> */}
    </>
  );
};

export default LabeledField;
