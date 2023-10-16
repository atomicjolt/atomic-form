import { useWatch } from "react-hook-form";
import { ToggleSwitch } from "@atomicjolt/atomic-elements";
import type { ToggleSwitchProps } from "@atomicjolt/atomic-elements";

import { FormInputProps } from "../../types";
import { useFormInput } from "../../hooks/useFormInput";

export type FormToggleSwitchProps = FormInputProps<
  ToggleSwitchProps,
  | "min"
  | "minLength"
  | "max"
  | "maxLength"
  | "valueAsDate"
  | "valueAsNumber"
  | "setValueAs"
  | "required"
>;

export function FormToggleSwitch(props: FormToggleSwitchProps) {
  const checked = useWatch({ name: props.name, defaultValue: false });

  const [componentProps, registration] = useFormInput<ToggleSwitchProps>(props);

  return (
    <ToggleSwitch {...registration} {...componentProps} checked={checked} />
  );
}
