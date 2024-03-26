import {
  FieldError,
  FieldErrorsImpl,
  FieldPath,
  FieldValues,
  Merge,
  Message,
  RegisterOptions,
  Validate,
  ValidationRule,
  ValidationValue,
} from "react-hook-form";

export type FormError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

/** The props that will be available on all form
 * inputs that are then passed down to react-hook-form */
type HookFormProps<
  V extends FieldValues = FieldValues,
  N extends FieldPath<V> = FieldPath<V>
> = Omit<
  RegisterOptions<V, N>,
  | "min"
  | "max"
  | "maxLength"
  | "minLength"
  | "disabled"
  | "required"
  | "valueAsNumber"
  | "valueAsDate"
  | "pattern"
  | "onChange"
  | "validate"
  | "value"
  | "setValueAs"
>;

type FormInputBaseProps<
  ValueType,
  V extends FieldValues = FieldValues,
  N extends FieldPath<V> = FieldPath<V>
> = HookFormProps<V, N> & {
  name: string;
  isRequired?: Message | ValidationRule<boolean>;
  validate?: Validate<ValueType, V> | Record<string, Validate<ValueType, V>>;
};

export type FormInputProps<FieldProps, ValueType> =
  FormInputBaseProps<ValueType> &
    Omit<
      FieldProps,
      | "isRequired"
      | "minLength"
      | "maxLength"
      | "minValue"
      | "maxValue"
      | "pattern"
      | "value"
    >;

export type LengthValdiators = {
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
};

export type SizeValidators<T extends ValidationValue = number> = {
  minValue?: ValidationRule<T>;
  maxValue?: ValidationRule<T>;
};

export type PatternValidators = {
  pattern?: ValidationRule<RegExp>;
};
