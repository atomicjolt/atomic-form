import { CheckBox } from "@atomicjolt/atomic-elements";
import type { CheckBoxProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormCheckBoxProps
  extends FormInputProps<CheckBoxProps, CheckBoxProps["isSelected"]> {}

export function FormCheckBox(props: FormCheckBoxProps) {
  const controlProps = useControllerField(props, CheckBox, { passRef: true, valueProp: "isSelected", defaultValueProp: "defaultSelected" });
  return <Controller {...controlProps} />;
}
