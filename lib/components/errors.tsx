import { ErrorMessage } from "@hookform/error-message";
import { FormError } from "../types";

export const errorMessage = (name: string, error: FormError) =>
  error ? <ErrorMessage name={name} /> : null;
