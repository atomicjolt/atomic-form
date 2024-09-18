import { CheckBox } from "@atomicjolt/atomic-elements";
import type { CheckBoxProps } from "@atomicjolt/atomic-elements";
import { FormInputProps } from "../../types";
import { useFormField } from "../../hooks/useFormField";

export type FormCheckBoxProps = FormInputProps<
  CheckBoxProps,
  CheckBoxProps["isSelected"]
>;

export function FormCheckBox(props: FormCheckBoxProps) {
  const { fieldProps, inputProps, ref } = useFormField<
    CheckBoxProps,
    CheckBoxProps["isSelected"]
  >({ ...props, defaultValue: props.defaultSelected });

  return (
    <CheckBox
      ref={ref}
      isSelected={inputProps.value}
      onChange={inputProps.onChange}
      {...fieldProps}
    />
  );
}
