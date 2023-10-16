import { FormInputProps } from "../../types";

import { Textarea } from "@atomicjolt/atomic-elements";
import type { TextareaProps } from "@atomicjolt/atomic-elements";

import { useFormInput } from "../../hooks/useFormInput";
import { errorMessage } from "../errors";

export type FormTextareaProps = FormInputProps<
  TextareaProps,
  "max" | "min" | "valueAsDate" | "valueAsNumber"
>;
export function FormTextarea(props: FormTextareaProps) {
  const [componentProps, registration, error] =
    useFormInput<TextareaProps>(props);

  return (
    <Textarea
      {...registration}
      {...componentProps}
      error={errorMessage(props.name, error)}
    />
  );
}
