import { TextAreaInput } from "@atomicjolt/atomic-elements";
import type { TextareaProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";

import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface TextAreaInputProps
  extends FormInputProps<TextareaProps, TextareaProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormTextAreaInput(props: TextAreaInputProps) {
  const controlProps = useControllerField(props, TextAreaInput, {
    passRef: true,
  });
  return <Controller {...controlProps} />;
}
