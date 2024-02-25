import { ToggleSwitch } from "@atomicjolt/atomic-elements";
import type { ToggleSwitchProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormToggleSwitchProps
  extends FormInputProps<ToggleSwitchProps, ToggleSwitchProps["isSelected"]> {}

export function FormToggleSwitch(props: FormToggleSwitchProps) {
  const controlProps = useControllerField(props, ToggleSwitch, {
    passRef: true,
    valueProp: "isSelected",
  });
  return <Controller {...controlProps} />;
}
