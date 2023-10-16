import {
  FieldValues,
  FormProvider as ReactHookFormProvider,
  UseFormReturn,
} from "react-hook-form";

/** Form Provider Props */
export interface FormProviderProps<TFieldValues extends FieldValues>
  extends UseFormReturn<TFieldValues> {
  children: React.ReactNode;
  onSubmit: (data: TFieldValues) => void;
}

/**
 * Form Provider Component
 * @description Use instead of Form, when you want to call the `useForm()` hook
 * yourself. Form actually uses this component internally.
 *
 * @param {FormProviderProps} props
 *
 * @example
 * import { useForm } from "react-hook-form";
 *
 * function App() {
 *  const methods = useForm();
 *
 *  return (
 *   <FormProvider onSubmit={(v) => console.log(v)} {...methods}>
 *     <Form.TextInput name="name" label="Name" required="Name is Required" />
 *   </FormProvider>
 *  );
 * }
 */
export function FormProvider<TFieldValues extends FieldValues>(
  props: FormProviderProps<TFieldValues>
) {
  const { onSubmit, children, ...methods } = props;

  return (
    <ReactHookFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </ReactHookFormProvider>
  );
}
