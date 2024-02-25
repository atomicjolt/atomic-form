import { RadioGroup } from "@atomicjolt/atomic-elements";
import type { RadioGroupsProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormRadioGroupProps
  extends FormInputProps<RadioGroupsProps, RadioGroupsProps["value"]> {}

export function FormRadioGroup(props: FormRadioGroupProps) {
  const controlProps = useControllerField(props, RadioGroup);
  return <Controller {...controlProps} />;
}
