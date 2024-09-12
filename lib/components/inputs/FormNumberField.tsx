import { NumberField } from "@atomicjolt/atomic-elements";
import type { NumberFieldProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import { FormInputProps, PatternValidators, SizeValidators } from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormNumberFieldProps
  extends FormInputProps<NumberFieldProps, NumberFieldProps["value"]>,
    SizeValidators,
    PatternValidators {}

export function FormNumberField(props: FormNumberFieldProps) {
  const controlProps = useControllerField(props, NumberField, {
    passRef: false,
  });
  return <Controller {...controlProps} />;
}
