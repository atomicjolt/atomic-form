import { Select } from "@atomicjolt/atomic-elements";
import type { SelectProps } from "@atomicjolt/atomic-elements";
import { Controller } from "react-hook-form";
import {
  FormInputProps,
  LengthValdiators,
  PatternValidators,
} from "../../types";
import { useControllerField } from "../../hooks/useControllerField";

export interface FormSelectProps
  extends FormInputProps<SelectProps, SelectProps["value"]>,
    LengthValdiators,
    PatternValidators {}

export function FormSelect(props: FormSelectProps) {
  const controlProps = useControllerField(props, Select, { passRef: true });
  return <Controller {...controlProps} />;
}
