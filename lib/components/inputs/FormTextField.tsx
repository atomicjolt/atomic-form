import { TextField } from "@atomicjolt/atomic-elements";
import type { TextFieldProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormTextFieldProps
  extends FormInputProps<TextFieldProps, TextFieldProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormTextField(props: FormTextFieldProps) {
  const controlProps = useControllerField(props, TextField, { passRef: false });
  return <Controller {...controlProps} />;
}
