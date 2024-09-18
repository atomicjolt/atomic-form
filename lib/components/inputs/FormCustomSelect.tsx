import { CustomSelect } from "@atomicjolt/atomic-elements";
import type { CustomSelectProps } from "@atomicjolt/atomic-elements";
import { FormInputProps } from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormCustomSelectProps<T extends object>
  extends FormInputProps<
    CustomSelectProps<T>,
    CustomSelectProps<T>["selectedKey"]
  > {}

export function FormCustomSelect<T extends object>(
  props: FormCustomSelectProps<T>
) {
  const { fieldProps, inputProps } = useFormField<
    CustomSelectProps<T>,
    CustomSelectProps<T>["selectedKey"]
  >({ ...props, defaultValue: props.defaultSelectedKey });

  return (
    <CustomSelect
      {...fieldProps}
      selectedKey={inputProps.value}
      onSelectionChange={inputProps.onChange}
    />
  );
}
