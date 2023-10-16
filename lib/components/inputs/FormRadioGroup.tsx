import { FormInputProps } from "../../types";
import { Controller, useFormContext } from "react-hook-form";

import { RadioGroup } from "@atomicjolt/atomic-elements";
import type { RadioGroupsProps } from "@atomicjolt/atomic-elements";

import { splitFormProps } from "../../hooks/useFormInput";
import { errorMessage } from "../errors";

export type FormRadioGroupProps = FormInputProps<
  RadioGroupsProps,
  | "valueAsDate"
  | "valueAsNumber"
  | "setValueAs"
  | "max"
  | "maxLength"
  | "min"
  | "minLength"
>;

export function FormRadioGroup(props: FormRadioGroupProps) {
  const [name, options, componentProps] = splitFormProps<
    RadioGroupsProps,
    FormInputProps<RadioGroupsProps>
  >(props);

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={options}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => {
        return (
          <RadioGroup
            onChange={onChange}
            value={value}
            {...componentProps}
            error={errorMessage(props.name, fieldState.error)}
          >
            {props.children}
          </RadioGroup>
        );
      }}
    />
  );
}
