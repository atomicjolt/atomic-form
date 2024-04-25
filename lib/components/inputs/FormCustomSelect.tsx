import { CustomSelect } from "@atomicjolt/atomic-elements";
import type { CustomSelectProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormCustomSelectProps<T extends object>
  extends FormInputProps<
    CustomSelectProps<T>,
    CustomSelectProps<T>["selectedKey"]
  > {}

export function FormCustomSelect<T extends object>(
  props: FormCustomSelectProps<T>
) {
  const controlProps = useControllerField(props, CustomSelect, {
    aliases: {
      value: "selectedKey",
      defaultValue: "defaultSelectedKeys",
      onChange: "onSelectionChange",
    },
  });
  return <Controller {...controlProps} />;
}
