import { RegisterOptions, useFormContext } from "react-hook-form";
import { useRegister } from "./useRegister";
import type { UseRegisterReturn } from "./useRegister";
import type { FormError, FormInputProps } from "../types";

const REGISTER_OPTIONS: Set<keyof RegisterOptions> = new Set([
  "required",
  "min",
  "max",
  "maxLength",
  "minLength",
  "pattern",
  "validate",
  "valueAsNumber",
  "valueAsDate",
  "value",
  "setValueAs",
  "shouldUnregister",
  "onChange",
  "onBlur",
  "disabled",
  "deps",
]);

export function splitFormProps<
  ComponentProps extends object,
  Props extends FormInputProps<ComponentProps>
>(props: Props): [string, Partial<RegisterOptions>, ComponentProps] {
  const options: RegisterOptions = {};
  const rest: ComponentProps = {} as ComponentProps;

  Object.entries(props).forEach(([key, value]: [any, any]) => {
    if (REGISTER_OPTIONS.has(key)) {
      options[key as keyof RegisterOptions] = value;
    } else if (key !== "name") {
      rest[key as keyof ComponentProps] = value;
    }

    if (key === "required") {
      // @ts-ignore
      rest[key as keyof ComponentProps] = true;
    }
  });

  return [props.name, options, rest];
}

export function useFormInput<ComponentProps extends object>(
  props: FormInputProps<ComponentProps>
): [ComponentProps, UseRegisterReturn, FormError] {
  const [name, options, componentProps] = splitFormProps<
    ComponentProps,
    FormInputProps<ComponentProps>
  >(props);

  const registration = useRegister(name, options);
  const form = useFormContext();
  const error = form.formState.errors[name];

  return [componentProps, registration, error];
}
