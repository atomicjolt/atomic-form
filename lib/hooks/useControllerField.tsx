import React from "react";
import { ControllerProps, useFormContext } from "react-hook-form";

interface Options {
  passRef?: boolean;
  aliases?: {
    onChange?: string;
    value?: string;
    defaultValue?: string;
  };
}

export function useControllerField(
  props: any,
  Element: React.ComponentType<any>,
  options: Options = {}
): ControllerProps {
  const {
    onBlur,
    deps,
    name,
    shouldUnregister,
    // Validators
    isRequired,
    isDisabled,
    minLength,
    maxLength,
    minValue,
    maxValue,
    pattern,
    validate,
    ...rest
  } = props;

  const {
    passRef = false,
    aliases: {
      onChange: onChangeAlias = "onChange",
      value: valueAlias = "value",
      defaultValue: defaultValueAlias = "defaultValue",
    } = {},
  } = options;

  const { control } = useFormContext();

  const controlProps: ControllerProps = {
    control,
    name,
    defaultValue: props[defaultValueAlias],
    disabled: isDisabled,
    shouldUnregister,
    rules: {
      required: isRequired,
      minLength,
      maxLength,
      min: minValue,
      max: maxValue,
      pattern,
      validate,
      onBlur,
      onChange: props[onChangeAlias],
      deps,
    },
    render: ({
      field: { name, value, onChange, onBlur, disabled, ref },
      fieldState: { invalid, error },
    }) => {
      const componentProps = {
        isRequired: ![undefined, false].includes(isRequired),
        isDisabled: disabled,
        isInvalid: invalid,
        error: error?.message,
        onBlur,
        [onChangeAlias]: onChange,
        [valueAlias]: value,
        ...rest,
      };

      if (passRef) {
        componentProps.ref = ref;
      }

      return <Element {...componentProps} name={name} />;
    },
  };

  return controlProps;
}
