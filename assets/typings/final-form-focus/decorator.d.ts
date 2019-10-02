declare module "final-form-focus" {
  import { Decorator } from "final-form";

  type FocusableInput = { name: string; focus: () => void };
  type GetInputs = () => FocusableInput[];
  type FindInput = (input: FocusableInput[]) => FocusableInput | undefined;

  export default function createDecorator(
    getInputs?: GetInputs,
    findInput?: FindInput
  ): Decorator;
}
