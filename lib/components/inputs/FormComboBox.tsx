import { ComboBox } from "@atomicjolt/atomic-elements";
import type { ComboBoxProps } from "@atomicjolt/atomic-elements";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import { FormInputProps } from "../../types";
import { Key } from "react-aria";

export interface FormComboBoxProps<T extends object>
  extends FormInputProps<ComboBoxProps<T>, ComboBoxProps<T>["selectedKey"]> {}

export function FormComboBox<T extends object>(props: FormComboBoxProps<T>) {
  const {
    onBlur,
    deps,
    defaultSelectedKey,
    allowsCustomValue,
    name,
    shouldUnregister,
    isRequired,
    isDisabled,
    validate,
    onSelectionChange,
    onInputChange,
    ...rest
  } = props;

  const { control } = useFormContext();

  const controlProps: ControllerProps = {
    control,
    name,
    defaultValue: defaultSelectedKey,
    disabled: isDisabled,
    shouldUnregister,
    rules: {
      required: isRequired,
      validate,
      onBlur,
      onChange: onInputChange,
      deps,
    },
    render: ({
      field: { name, value, onChange, onBlur, disabled },
      fieldState: { invalid, error },
    }) => {
      let inputManagementProps = {};

      if (allowsCustomValue) {
        inputManagementProps = {
          inputValue: value,
          onInputChange: onChange,
          onSelectionChange: (key: Key) => {
            if (key) {
              onChange(key);
              onSelectionChange?.(key);
            }
          },
        };
      } else {
        inputManagementProps = {
          selectedKey: value,
          onSelectionChange: onChange,
        };
      }

      return (
        <ComboBox
          {...rest}
          {...inputManagementProps}
          allowsCustomValue={allowsCustomValue}
          name={name}
          onBlur={onBlur}
          isDisabled={disabled}
          isInvalid={invalid}
          error={error?.message}
          isRequired={isRequired !== undefined}
        />
      );
    },
  };

  return <Controller {...controlProps} />;
}
