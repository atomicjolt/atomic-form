import { ToggleSwitch } from "@atomicjolt/atomic-elements";
import type { ToggleSwitchProps } from "@atomicjolt/atomic-elements";
import { FormInputProps } from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormToggleSwitchProps
  extends FormInputProps<ToggleSwitchProps, ToggleSwitchProps["isSelected"]> {}

export function FormToggleSwitch(props: FormToggleSwitchProps) {
  const { fieldProps, inputProps, ref } = useFormField<
    ToggleSwitchProps,
    ToggleSwitchProps["isSelected"]
  >(props);

  return (
    <ToggleSwitch
      {...fieldProps}
      isSelected={inputProps.value}
      onChange={inputProps.onChange}
      ref={ref}
    />
  );
}
