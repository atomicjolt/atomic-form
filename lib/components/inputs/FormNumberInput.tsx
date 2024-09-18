import { NumberInput } from "@atomicjolt/atomic-elements";
import type { NumberInputProps } from "@atomicjolt/atomic-elements";
import { FormInputProps, PatternValidators, SizeValidators } from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormNumberInputProps
  extends FormInputProps<NumberInputProps, NumberInputProps["value"]>,
    SizeValidators,
    PatternValidators {}

export function FormNumberInput(props: FormNumberInputProps) {
  const { inputProps, fieldProps, ref } = useFormField<
    NumberInputProps,
    NumberInputProps["value"]
  >(props);

  return <NumberInput {...fieldProps} {...inputProps} ref={ref} />;
}
