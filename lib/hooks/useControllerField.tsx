import React from "react";
import { ControllerProps, useFormContext } from "react-hook-form";

interface Options {
  passRef?: boolean;
  excludeProps?: string[];
  valueProp?: string;
  onChangeProp?: string;
}

export function useControllerField(
  props: any,
  Element: React.ComponentType<any>,
  options: Options = {}
): ControllerProps {
  const {
    onBlur,

    deps,
    defaultValue,
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
    valueProp = "value",
    excludeProps = [],
    onChangeProp = "onChange",
  } = options;

  const { control } = useFormContext();

  const controlProps: ControllerProps = {
    control,
    name,
    defaultValue,
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
      onChange: props[onChangeProp],
      deps,
    },
    render: ({
      field: { name, value, onChange, onBlur, disabled, ref },
      fieldState: { invalid, error },
    }) => {
      const componentProps = {
        ...rest,
        isRequired: isRequired !== undefined,
        isDisabled: disabled,
        isInvalid: invalid,
        onBlur,
        [onChangeProp]: onChange,
        error: error?.message,
      };

      excludeProps.forEach((prop) => {
        delete componentProps[prop];
      });

      componentProps[valueProp] = value;

      if (passRef) {
        componentProps.ref = ref;
      }

      return <Element {...componentProps} name={name} />;
    },
  };

  return controlProps;
}
