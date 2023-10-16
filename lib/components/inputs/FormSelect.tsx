import { FormInputProps } from "../../types";

import { Select } from "@atomicjolt/atomic-elements";
import type { SelectProps } from "@atomicjolt/atomic-elements";

import { useFormInput } from "../../hooks/useFormInput";
import { errorMessage } from "../errors";

export type FormSelectProps = FormInputProps<
  SelectProps,
  "valueAsDate" | "valueAsNumber" | "setValueAs"
>;

export function FormSelect(props: FormSelectProps) {
  const [componentProps, registration, error] =
    useFormInput<SelectProps>(props);

  return (
    <Select
      {...registration}
      {...componentProps}
      error={errorMessage(props.name, error)}
    />
  );
}
