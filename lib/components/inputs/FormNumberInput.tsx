import { FormInputProps } from "../../types";
import { useFormInput } from "../../hooks/useFormInput";
import { NumberInput } from "@atomicjolt/atomic-elements";
import type { NumberInputProps } from "@atomicjolt/atomic-elements";
import { errorMessage } from "../errors";

export type FormNumberInputProps = FormInputProps<
  NumberInputProps,
  "maxLength" | "minLength" | "valueAsDate" | "valueAsNumber" | "setValueAs"
>;

export function FormNumberInput(props: FormNumberInputProps) {
  const [componentProps, registration, error] = useFormInput<NumberInputProps>({
    ...props,
    valueAsNumber: true,
  });

  return (
    // @ts-ignore
    <NumberInput
      {...registration}
      {...componentProps}
      error={errorMessage(props.name, error)}
    />
  );
}
