import { FormInputProps } from "../../types";

import { CheckBox } from "@atomicjolt/atomic-elements";
import type { CheckboxProps } from "@atomicjolt/atomic-elements";

import { useFormInput } from "../../hooks/useFormInput";
import { errorMessage } from "../errors";

export type FormCheckboxProps = FormInputProps<
  CheckboxProps,
  | "min"
  | "minLength"
  | "max"
  | "maxLength"
  | "valueAsDate"
  | "valueAsNumber"
  | "setValueAs"
>;

export function FormCheckbox(props: FormCheckboxProps) {
  const [componentProps, registration, error] =
    useFormInput<CheckboxProps>(props);

  return (
    <CheckBox
      {...registration}
      {...componentProps}
      error={errorMessage(props.name, error)}
    />
  );
}
