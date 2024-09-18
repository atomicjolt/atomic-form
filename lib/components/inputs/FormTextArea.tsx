import { TextAreaInput, TextareaProps } from "@atomicjolt/atomic-elements";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormTextAreaInputProps
  extends FormInputProps<TextareaProps, TextareaProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormTextAreaInput(props: FormTextAreaInputProps) {
  const { fieldProps, inputProps, ref } = useFormField<
    TextareaProps,
    TextareaProps["value"]
  >(props);

  return <TextAreaInput {...fieldProps} {...inputProps} ref={ref} />;
}
