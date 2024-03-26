import { TextArea } from "@atomicjolt/atomic-elements";
import type { TextareaProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";

import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormTextAreaProps
  extends FormInputProps<TextareaProps, TextareaProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormTextArea(props: FormTextAreaProps) {
  const controlProps = useControllerField(props, TextArea, { passRef: true });
  return <Controller {...controlProps} />;
}
