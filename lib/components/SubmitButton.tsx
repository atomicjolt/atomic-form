import { Button } from "@atomicjolt/atomic-elements";
import type { ButtonProps } from "@atomicjolt/atomic-elements";

export type SubmitButtonProps = Omit<ButtonProps, "type">;

/** Submit Button Component
 * Simple wrapper around Atomic Elements Button component, with the type set to "submit"
 */
export function SubmitButton(props: SubmitButtonProps) {
  const { children, ...rest } = props;


  return (
    // It's being weird with loading props, so we'll just ignore it for now
    // @ts-ignore
    <Button type="submit" {...rest}>
      {props.children}
    </Button>
  );
}
