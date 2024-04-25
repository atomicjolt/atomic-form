import { Select } from "@atomicjolt/atomic-elements";
import type { SelectProps, SelectValue } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormSelectProps<T extends SelectValue>
  extends FormInputProps<SelectProps<T>, SelectProps<T>["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormSelect<T extends SelectValue>(props: FormSelectProps<T>) {
  const controlProps = useControllerField(props, Select, { passRef: true });
  return <Controller {...controlProps} />;
}
