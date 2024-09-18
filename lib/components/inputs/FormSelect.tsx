import { Select } from "@atomicjolt/atomic-elements";
import type { SelectProps, SelectValue } from "@atomicjolt/atomic-elements";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useFormField } from "../../hooks/useFormField";

export interface FormSelectProps<T extends SelectValue>
  extends FormInputProps<SelectProps<T>, SelectProps<T>["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormSelect<T extends SelectValue>(props: FormSelectProps<T>) {
  const { fieldProps, inputProps, ref } = useFormField<
    SelectProps<T>,
    SelectProps<T>["value"]
  >(props);

  return <Select {...fieldProps} {...inputProps} ref={ref} />;
}
