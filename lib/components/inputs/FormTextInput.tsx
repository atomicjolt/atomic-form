import { TextInput } from "@atomicjolt/atomic-elements";
import type { TextInputProps } from "@atomicjolt/atomic-elements";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormTextInputProps
  extends FormInputProps<TextInputProps, TextInputProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormTextInput(props: FormTextInputProps) {
  const { fieldProps, inputProps, ref } = useFormField<
    TextInputProps,
    TextInputProps["value"]
  >(props);

  return <TextInput {...fieldProps} {...inputProps} ref={ref} />;
}
