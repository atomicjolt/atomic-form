import { MultiSelect, MultiSelectProps } from "@atomicjolt/atomic-elements";
import { FormInputProps } from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormMultiSelectProps<T extends object>
  extends FormInputProps<
    MultiSelectProps<T>,
    MultiSelectProps<T>["selectedKeys"]
  > {}

export function FormMultiSelect<T extends object>(
  props: FormMultiSelectProps<T>
) {
  const { fieldProps, inputProps } = useFormField<
    MultiSelectProps<T>,
    MultiSelectProps<T>["selectedKeys"]
  >({ ...props, defaultValue: props.defaultSelectedKeys });

  return (
    <MultiSelect
      {...fieldProps}
      selectedKeys={inputProps.value}
      onSelectionChange={(v) => {
        if (v instanceof Set) {
          inputProps.onChange([...v]);
        } else {
          inputProps.onChange(v);
        }
      }}
    />
  );
}
