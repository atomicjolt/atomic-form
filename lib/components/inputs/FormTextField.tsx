import { TextField } from "@atomicjolt/atomic-elements";
import type { TextFieldProps } from "@atomicjolt/atomic-elements";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormTextFieldProps
  extends FormInputProps<TextFieldProps, TextFieldProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormTextField(props: FormTextFieldProps) {
  const { fieldProps, inputProps } = useFormField<
    TextFieldProps,
    TextFieldProps["value"]
  >(props);

  return <TextField {...fieldProps} {...inputProps} />;
}
