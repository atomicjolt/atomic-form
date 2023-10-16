import { FormInputProps } from "../../types";
import { Controller, useFormContext } from "react-hook-form";

import { CustomSelect } from "@atomicjolt/atomic-elements";
import type { CustomSelectProps } from "@atomicjolt/atomic-elements";

import { splitFormProps } from "../../hooks/useFormInput";
import { errorMessage } from "../errors";

export type FormCustomSelectProps<T extends object> = FormInputProps<
  CustomSelectProps<T>,
  | "valueAsDate"
  | "valueAsNumber"
  | "setValueAs"
  | "max"
  | "maxLength"
  | "min"
  | "minLength"
>;

export function FormCustomSelect<T extends object>(
  props: FormCustomSelectProps<T>
) {
  const [name, options, componentProps] = splitFormProps<
    CustomSelectProps<T>,
    FormInputProps<CustomSelectProps<T>>
  >(props);

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={options}
      control={control}
      render={({ field: { onBlur, onChange, value }, fieldState }) => {
        return (
          <CustomSelect
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            {...componentProps}
            error={errorMessage(props.name, fieldState.error)}
          />
        );
      }}
    />
  );
}
