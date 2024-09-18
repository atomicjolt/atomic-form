import { ComboBox } from "@atomicjolt/atomic-elements";
import type { Key, ComboBoxProps } from "@atomicjolt/atomic-elements";
import { FormInputProps } from "../../types";
import { useFormField } from "../../hooks/useFormField";
import { useMemo } from "react";

export interface FormComboBoxProps<T extends object>
  extends FormInputProps<ComboBoxProps<T>, ComboBoxProps<T>["selectedKey"]> {}

export function FormComboBox<T extends object>(props: FormComboBoxProps<T>) {
  const { allowsCustomValue, onSelectionChange } = props;
  const {
    fieldProps,
    inputProps: { value, onChange },
  } = useFormField<ComboBoxProps<T>, ComboBoxProps<T>["selectedKey"]>({
    ...props,
    defaultValue: props.defaultSelectedKey,
  });

  const inputProps = useMemo(() => {
    if (allowsCustomValue) {
      return {
        inputValue: value as string,
        onInputChange: onChange,
        onSelectionChange: (key?: Key | null) => {
          if (key) {
            onChange(key);
            onSelectionChange?.(key);
          }
        },
      };
    } else {
      return {
        selectedKey: value as string,
        onSelectionChange: onChange,
      };
    }
  }, [allowsCustomValue, value, onChange, onSelectionChange]);

  return <ComboBox {...fieldProps} {...inputProps} />;
}
