import { Controller } from "react-hook-form";
import { MultiSelect, MultiSelectProps } from "@atomicjolt/atomic-elements";
import { FormInputProps } from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormMultiSelectProps<T extends object>
  extends FormInputProps<
    MultiSelectProps<T>,
    MultiSelectProps<T>["selectedKeys"]
  > {}

export function FormMultiSelect<T extends object>(
  props: FormMultiSelectProps<T>
) {
  const controlProps = useControllerField(props, MultiSelect, {
    aliases: {
      value: "selectedKeys",
      defaultValue: "defaultSelectedKeys",
      onChange: "onSelectionChange",
    },
  });
  return <Controller {...controlProps} />;
}
