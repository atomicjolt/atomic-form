import { RadioGroup } from "@atomicjolt/atomic-elements";
import type { RadioGroupsProps } from "@atomicjolt/atomic-elements";
import { FormInputProps } from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormRadioGroupProps
  extends FormInputProps<RadioGroupsProps, RadioGroupsProps["value"]> {}

export function FormRadioGroup(props: FormRadioGroupProps) {
  const { fieldProps, inputProps } = useFormField<
    RadioGroupsProps,
    RadioGroupsProps["value"]
  >(props);

  return <RadioGroup {...fieldProps} {...inputProps} />;
}
