import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import {
  FormCheckBox,
  FormCustomSelect,
  FormNumberInput,
  FormSelect,
  FormTextArea,
  FormTextInput,
  FormToggleSwitch,
  FormRadioGroup,
  FormComboBox,
} from "./inputs";
import { FormProvider } from "./FormProvider";
import {
  Option as AtomicElementsOption,
  Radio as AtomicElementsRadio,
  Item as AtomicElementsItem,
  Section as AtomicElementsSection,
} from "@atomicjolt/atomic-elements";

/** Form Component Props */
export interface FormProps<TFieldValues extends FieldValues>
  extends UseFormProps<TFieldValues> {
  onSubmit: (data: TFieldValues) => void;
  children: React.ReactNode;
}

/** Form Component
 * @description A wrapper component for react-hook-form that provides
 * a context for all form inputs. This component should be used as the
 * top level component for all forms. The properties that this component
 * accepts are the same as the useForm hook from react-hook-form + the onSubmit
 * callback.
 *
 * @param {FormProps} props
 *
 * @example
 *
 * function App() {
 *  return (
 *   <Form onSubmit={(v) => console.log(v)}>
 *     <Form.TextInput name="name" label="Name" required="Name is Required" />
 *   </Form>
 *  );
 * }
 *
 */
export function Form<TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues>
) {
  const { onSubmit, children, ...rest } = props;
  const methods = useForm<TFieldValues>(rest);

  return (
    <FormProvider onSubmit={onSubmit} {...methods}>
      {children}
    </FormProvider>
  );
}

Form.TextInput = FormTextInput;
Form.NumberInput = FormNumberInput;
Form.CheckBox = FormCheckBox;
Form.TextArea = FormTextArea;
Form.ToggleSwitch = FormToggleSwitch;
Form.Select = FormSelect;
Form.CustomSelect = FormCustomSelect;
Form.Item = AtomicElementsItem;
Form.Section = AtomicElementsSection;
Form.Option = AtomicElementsOption;
Form.RadioGroup = FormRadioGroup;
Form.Radio = AtomicElementsRadio;
Form.ComboBox = FormComboBox;
