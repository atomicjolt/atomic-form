import { NumberInput } from "@atomicjolt/atomic-elements";
import type { NumberInputProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import { FormInputProps, PatternValidators, SizeValidators } from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormNumberInputProps
  extends FormInputProps<NumberInputProps, NumberInputProps["value"]>,
    SizeValidators,
    PatternValidators {}

export function FormNumberInput(props: FormNumberInputProps) {
  const controlProps = useControllerField(props, NumberInput, {
    passRef: true,
  });
  return <Controller {...controlProps} />;
}
