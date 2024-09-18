import React from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
  SizeValidators,
} from "../types";

type useFormFieldProps<P, V> = FormInputProps<P, V> &
  LengthValdiators &
  SizeValidators &
  PatternValidators &
  Record<string, any> & {
    defaultValue?: V;
  };

interface UseFormField<P, V> {
  fieldProps: P;
  inputProps: {
    onChange: (e: V) => void;
    value: V;
  };
  ref: React.RefCallback<any>;
}

export function useFormField<P, V>(
  props: useFormFieldProps<P, V>
): UseFormField<P, V> {
  const {
    onBlur,
    onChange,
    defaultValue,
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

  const { control } = useFormContext();

  const { field, fieldState } = useController({
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
      deps,
      onBlur,
      onChange,
    },
  });

  return {
    inputProps: {
      onChange: field.onChange,
      value: field.value,
    },
    // @ts-expect-error
    fieldProps: {
      isRequired: ![undefined, false].includes(isRequired as any),
      isDisabled,
      isInvalid: fieldState.invalid,
      error: fieldState.error?.message,
      onBlur: field.onBlur,
      ...rest,
    },
    ref: field.ref,
  };
}
