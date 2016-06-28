import { useMemo } from "react";
import {
  RegisterOptions,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";

export type UseRegisterReturn = Omit<
  UseFormRegisterReturn<string>,
  "onChange"
> & {
  onChange: any; // TODO: can I type this more explicitly?
};

export function useRegister(
  name: string,
  options: RegisterOptions
): UseRegisterReturn {
  const { register } = useFormContext();

  return useMemo(() => {
    const registration = register(name, options);
    const onChange = registration.onChange;
    return {
      ...registration,
      onChange: (_value: any, event: any) => {
        onChange(event);
      },
    };
  }, [name, options]);
}
