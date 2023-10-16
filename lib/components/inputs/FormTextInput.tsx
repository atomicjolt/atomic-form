import { FormInputProps } from "../../types";
import { useFormInput } from "../../hooks/useFormInput";
import { TextInput } from "@atomicjolt/atomic-elements";
import type { TextInputProps } from "@atomicjolt/atomic-elements";
import { errorMessage } from "../errors";

export type FormTextInputProps = FormInputProps<
  TextInputProps,
  "max" | "min" | "valueAsDate" | "valueAsNumber" | "setValueAs"
>;

export function FormTextInput(props: FormTextInputProps) {
  const [componentProps, registration, error] =
    useFormInput<TextInputProps>(props);

  return (
    <TextInput
      {...registration}
      {...componentProps}
      error={errorMessage(props.name, error)}
    />
  );
}
