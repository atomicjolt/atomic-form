import { TextInput } from "@atomicjolt/atomic-elements";
import type { TextInputProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormTextInputProps
  extends FormInputProps<TextInputProps, TextInputProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormTextInput(props: FormTextInputProps) {
  const controlProps = useControllerField(props, TextInput, { passRef: true });
  return <Controller {...controlProps} />;
}
