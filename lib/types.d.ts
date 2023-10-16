import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  RegisterOptions,
} from "react-hook-form";

// Utility type to omit the overlapping props between the components and react-hook-form
// The Form wrapper component will not expose these props to the user directly, but through
// the react-hook-form types
// This is notable for things like `required` which is props on both
// the components and react-hook-form, but we want to expose the react-hook-form version
// because it allows you to add validation messages
type OmitOverlappingProps<ComponentProps> = Omit<
  ComponentProps,
  | "disabled"
  | "value"
  | "onChange"
  | "onBlur"
  | "required"
  | "error"
  | "min"
  | "defaultValue"
>;

type RegisterOptionKeys = keyof RegisterOptions;

export type FormInputProps<
  // The props of the component we are wrapping (e.g. TextInputProps)
  ComponentProps,
  // The props we want to omit from the react-hook-form register options (e.g. min for TextInput since
  // having a min doesn't make sense on a text input)
  OmitFormOptions extends RegisterOptionKeys | "" = ""
> = OmitOverlappingProps<ComponentProps> &
  Omit<RegisterOptions, OmitFormOptions> & { name: string }; // Include the name prop since we need it to register the field with react-hook-form

export type FormError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;
